const router = require("express").Router();

const servicesRouter = require("./services");

router.use("/", servicesRouter);

const picnicRouter = require("./picnics");

router.use("/", picnicRouter);

module.exports = router;
