const db = require('../config/db');

/**
 * Lấy houses mà user là member
 */
exports.getHouses = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT h.*
    FROM houses h
    JOIN house_members hm ON h.id = hm.house_id
    WHERE hm.user_id = ?
    `,
    [userId]
  );

  return rows;
};

/**
 * Tạo house + add owner vào house_members (TRANSACTION)
 */
exports.createHouse = async ({ name, location, description, ownerId }) => {
  const conn = await db.getConnection(); 

  try {
    await conn.beginTransaction(); 

    const [houseResult] = await conn.query(
      `
      INSERT INTO houses (name, location, description, owner_id)
      VALUES (?, ?, ?, ?)
      `,
      [name, location, description || null, ownerId]
    );

    const houseId = houseResult.insertId;

    await conn.query(
      `
      INSERT INTO house_members (house_id, user_id, role)
      VALUES (?, ?, 'OWNER')
      `,
      [houseId, ownerId]
    );

    await conn.commit(); 

    return {
      message: 'House created successfully',
      houseId
    };

  } catch (err) {
    await conn.rollback(); 
    throw err;
  } finally {
    conn.release(); 
  }
};

/**
 * Update house (chỉ OWNER)
 */
exports.updateHouse = async (houseId, data, userId) => {
  const [result] = await db.query(
    `
    UPDATE houses
    SET ?
    WHERE id = ? AND owner_id = ?
    `,
    [data, houseId, userId]
  );

  if (result.affectedRows === 0) {
    throw new Error('Not owner or house not found');
  }

  return { message: 'House updated successfully' };
};

/**
 * Thêm member (chỉ OWNER)
 */
exports.addMember = async (houseId, memberId, ownerId) => {
  const [result] = await db.query(
    `
    INSERT INTO house_members (house_id, user_id, role)
    SELECT ?, ?, 'MEMBER'
    FROM houses
    WHERE id = ? AND owner_id = ?
    `,
    [houseId, memberId, houseId, ownerId]
  );

  if (result.affectedRows === 0) {
    throw new Error('Not owner or house not found');
  }

  return { message: 'Member added successfully' };
};

/**
 * Xoá member (chỉ OWNER)
 */
exports.deleteMember = async (houseId, memberId, ownerId) => {
  const [result] = await db.query(
    `
    DELETE hm
    FROM house_members hm
    JOIN houses h ON hm.house_id = h.id
    WHERE hm.house_id = ?
      AND hm.user_id = ?
      AND h.owner_id = ?
    `,
    [houseId, memberId, ownerId]
  );

  return { message: 'Member removed successfully' };
};

/**
 * Lấy events của house
 */
exports.getEvents = async (houseId) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM events
    WHERE house_id = ?
    ORDER BY created_at DESC
    `,
    [houseId]
  );

  return rows;
};
