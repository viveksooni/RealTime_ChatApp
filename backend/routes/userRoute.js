const {
  register,
  login,
  setAvatar,
  getallUser,
  logout,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar", setAvatar);
router.get("/allUsers/:id", getallUser);
router.get("/logOut/:id", logout);

module.exports = router;
