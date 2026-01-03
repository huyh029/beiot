 exports.getHouses = async () => {
  return [{ id: 1, name: 'Nhà nấm A' }];
};

exports.createHouse = async (data) => {
  return { id: Date.now(), ...data };
};

exports.updateHouse = async (houseId, data) => {
  return { id: houseId, ...data };
};

exports.addMember = async (houseId, data) => {
  return { houseId, addedUser: data };
};

exports.deleteMember = async (houseId, userId) => {
  return { houseId, removedUser: userId };
};

exports.getEvents = async (houseId) => {
  return [
    { id: 1, houseId, message: 'Nhiệt độ cao' },
    { id: 2, houseId, message: 'Độ ẩm thấp' }
  ];
};
