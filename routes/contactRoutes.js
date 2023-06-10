const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
const {
  getContacts,
  createContacts,
  getContact,
  updateContacts,
  deleteContacts,
} = require("../controllers/contactController");
router.use(validateToken);
router.route("/").get(getContacts).post(createContacts);
router.route("/:id").get(getContact).put(updateContacts).delete(deleteContacts);

module.exports = router;
