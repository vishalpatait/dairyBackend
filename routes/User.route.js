const express = require("express");
const router = express.Router();

const UserCtrl = require("../controllers/user.controller");
const CommonCtrl = require("../controllers/common.controller");
const common = new CommonCtrl();
const user = new UserCtrl();

router.post("/", user.create);
router.post("/login", user.login);
router.put("/forgot-password", common.forgotPassword);
router.put("/reset-password", common.resetPassword);
router.put("/:id", user.update);
router.delete("/:id", user.delete);

router.get("/", user.getAll);
router.get("/:id", user.getSingle);
module.exports = router;
