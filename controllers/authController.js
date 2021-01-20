const db = require("../models");
const config = require("../config/auth.js");
const User = db.User;
const Role = db.Role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  // Save User to Database
  if (!req.body.password) {
    res.status(400).send({
      message: "Password can not be empty.",
    });
    return;
  }

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was successfully registered." });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was successfully registered." });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.login = (req, res) => {
  // Username
  if (!req.body.username) {
    res.status(400).send({
      message: "Username can not be empty.",
    });
    return;
  }

  // Password
  if (!req.body.password) {
    res.status(400).send({
      message: "Password can not be empty.",
    });
    return;
  }

  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      // Check username
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // Check password
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password.",
        });
      }

      // Authentication token
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
