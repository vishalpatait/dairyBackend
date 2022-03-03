const express = require("express");
const router = express.Router();

const CustomerMilk = require("../controllers/customerMilk.controller");

const custmrMilk = new CustomerMilk();

router.post("/", custmrMilk.create);
router.post("/myUser", custmrMilk.myUserData);

router.put("/:id", custmrMilk.update);
router.delete("/:id", custmrMilk.delete);

router.get("/", custmrMilk.getAll);
router.get("/:id", custmrMilk.getSingle);

module.exports = router;
