const express = require("express");
const router = express.Router();

const milkTypeCtrl = require("../controllers/milktype.controller");

const milkType = new milkTypeCtrl();

router.post("/", milkType.create);
router.put("/:id", milkType.update);
router.delete("/:id", milkType.delete);

router.get("/", milkType.getAll);
router.get("/:id", milkType.getSingle);

module.exports = router;
