module.exports = (sequelize, Sequelize) => {
  const ParkingSpace = sequelize.define("parking_space", {
    number: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    floor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    available: {
      type: Sequelize.BOOLEAN,
    },
    occupationTime: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return ParkingSpace;
};
