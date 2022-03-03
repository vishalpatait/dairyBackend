const express = require("express");
const router = express.Router();

const CustomerCtrl = require("../controllers/customer.controller");

const custmr = new CustomerCtrl();

router.post("/", custmr.create);
router.put("/:id", custmr.update);
router.delete("/:id", custmr.delete);

router.get("/", custmr.getAll);
router.get("/:id", custmr.getSingle);

module.exports = router;
