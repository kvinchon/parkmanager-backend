const { authJwt } = require("../middlewares");
const parkingSpaceController = require("../controllers/parkingSpaceController.js");

var router = require("express").Router();

module.exports = (app) => {
  /**
   * @swagger
   * /api/parking-spaces:
   *  post:
   *    description: Create a new ParkingSpace
   *    consumes:
   *      - application/json
   *    parameters:
   *      - in: body
   *        name: parkingSpace
   *        description: The parking space to create
   *        schema:
   *          type: object
   *          required:
   *            - number
   *            - floor
   *          properties:
   *            number:
   *              type: integer
   *            floor:
   *              type: string
   *            occupationTime:
   *              type: integer
   *            userId:
   *              type: integer
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: OK
   *      '400':
   *        description: Bad Request
   *      '500':
   *        description: Internal Server Error
   */
  router.post(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    parkingSpaceController.create
  );

  /**
   * @swagger
   * /api/parking-spaces:
   *  get:
   *    description: Retrieve all ParkingSpaces
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: OK
   *      '500':
   *        description: Internal Server Error
   */
  router.get(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    parkingSpaceController.findAll
  );

  /**
   * @swagger
   * /api/parking-spaces/{id}:
   *  get:
   *    parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: The parking space ID
   *    description: Retrieve a single ParkingSpace with id
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: OK
   *      '400':
   *        description: Bad Request
   *      '500':
   *        description: Internal Server Error
   */
  router.get(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    parkingSpaceController.findOne
  );

  /**
   * @swagger
   * /api/parking-spaces/available/{floor}:
   *  get:
   *    parameters:
   *    - in: path
   *      name: floor
   *      required: true
   *      description: The parking space floor
   *    description: Retrieve a single free ParkingSpace with floor
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: OK
   *      '400':
   *        description: Bad Request
   *      '500':
   *        description: Internal Server Error
   */
  router.get(
    "/available/:floor",
    [authJwt.verifyToken, authJwt.isPublicOrAdmin],
    parkingSpaceController.findOneByFloor
  );

  /**
   * @swagger
   * /api/parking-spaces/user/{userId}:
   *  get:
   *    parameters:
   *    - in: path
   *      name: userId
   *      required: true
   *      description: The parking space user ID
   *    description: Retrieve a single ParkingSpace with user id
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: OK
   *      '400':
   *        description: Bad Request
   *      '500':
   *        description: Internal Server Error
   */
  router.get(
    "/user/:userId",
    [authJwt.verifyToken, authJwt.isPublicOrAdmin],
    parkingSpaceController.findOneByUserId
  );

  /**
   * @swagger
   * /api/parking-spaces/{id}:
   *  put:
   *    description: Update a ParkingSpace with id
   *    consumes:
   *      - application/json
   *    parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: The parking space ID
   *    - in: body
   *      name: parkingSpace
   *      description: The parking space information to update
   *      schema:
   *        type: object
   *        properties:
   *          number:
   *            type: integer
   *          floor:
   *            type: string
   *          occupationTime:
   *            type: integer
   *          userId:
   *            type: integer
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: OK
   *      '400':
   *        description: Bad Request
   *      '500':
   *        description: Internal Server Error
   */
  router.put(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    parkingSpaceController.update
  );

  /**
   * @swagger
   * /api/parking-spaces/{id}:
   *  delete:
   *    parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: The parking space ID
   *    description: Delete a ParkingSpace with id
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: OK
   *      '400':
   *        description: Bad Request
   *      '500':
   *        description: Internal Server Error
   */
  router.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    parkingSpaceController.delete
  );

  /**
   * @swagger
   * /api/parking-spaces:
   *  delete:
   *    description: Delete all ParkingSpaces
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: OK
   *      '500':
   *        description: Internal Server Error
   */
  router.delete(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    parkingSpaceController.deleteAll
  );

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/api/parking-spaces", router);
};
