module.exports = (sequelize, Sequelize) => {
  const ParkingSpace = sequelize.define("parking_space", {
    number: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    floor: {
      type: Sequelize.INTEGER,
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
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  });

  return ParkingSpace;
};
