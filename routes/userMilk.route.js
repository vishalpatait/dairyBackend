const express = require("express");
const router = express.Router();

const UserMilk = require("../controllers/userMilk.controller");

const userMilk = new UserMilk();

router.post("/", userMilk.create);
router.post("/userMilk", userMilk.userMilkData);
router.get("/", userMilk.getAll);
router.put("/:id", userMilk.update);
router.delete("/:id", userMilk.delete);
router.get("/:id", userMilk.getSingle);

module.exports = router;
