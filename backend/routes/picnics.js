const router = require("express").Router();

const picnicController = require("../controllers/picnicController");

router.route("/picnics").post((req, res) => picnicController.create(req, res));

router.route("/picnics").get((req, res) => picnicController.getAll(req, res));

router.route("/picnics/:id").get((req, res) => picnicController.get(req, res));

router
  .route("/picnics/:id")
  .delete((req, res) => picnicController.delete(req, res));

router
  .route("/picnics/:id")
  .put((req, res) => picnicController.update(req, res));

module.exports = router;
