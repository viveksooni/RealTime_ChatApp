const { register, login, setAvatar, getallUser } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar", setAvatar);
router.get("/allUsers/:id", getallUser);

module.exports = router;
