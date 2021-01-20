const db = require("../models");
const ParkingSpace = db.ParkingSpace;

// Create and Save a new ParkingSpace
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.number) {
    res.status(400).send({
      message: "Number can not be empty.",
    });
    return;
  }

  if (!req.body.floor) {
    res.status(400).send({
      message: "Floor can not be empty.",
    });
    return;
  }

  // Create a ParkingSpace
  const parkingSpace = {
    number: req.body.number,
    floor: req.body.floor,
  };

  // Save ParkingSpace in the database
  ParkingSpace.create(parkingSpace)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the parking space.",
      });
    });
};

// Retrieve all ParkingSpaces from the database.
exports.findAll = (req, res) => {
  ParkingSpace.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving parking spaces.",
      });
    });
};

// Find a single ParkingSpace with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ParkingSpace.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({
          message: `Error retrieving the parking space with id=${id}. Maybe parking space was not found or req.params.id is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving parking space with id=" + id,
      });
    });
};

// Find a single free ParkingSpace by the floor in the request
exports.findOneByFloor = (req, res) => {
  const floor = req.params.floor;

  ParkingSpace.findOne({
    where: {
      floor: floor,
      available: true,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({
          message: `Error retrieving parking space with floor=${floor}. Maybe parking space was not found or req.params.floor is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving parking space with floor=" + floor,
      });
    });
};

// Find a single ParkingSpace by the userId in the request
exports.findOneByUserId = (req, res) => {
  const userId = req.params.userId;

  ParkingSpace.findOne({
    where: {
      userId: userId,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({
          message: `Error retrieving parking space with userId=${userId}. Maybe parking space was not found or req.params.userId is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving parking space with userId=" + userId,
      });
    });
};

// Update a ParkingSpace by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  ParkingSpace.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Parking space was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update parking space with id=${id}. Maybe parking space was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating parking space with id=" + id,
      });
    });
};

// Delete a ParkingSpace with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ParkingSpace.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Parking space was deleted successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot delete parking space with id=${id}. Maybe parking space was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete parking space with id=" + id,
      });
    });
};

// Delete all ParkingSpaces from the database.
exports.deleteAll = (req, res) => {
  ParkingSpace.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} parking spaces were deleted successfully.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all parking spaces.",
      });
    });
};
