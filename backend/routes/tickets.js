const express = require("express");
const {
  createTicket,
  getTickets,
  updateTicketStatus,
} = require("../controllers/tickets");
const auth = require("../middleware/auth");

const router = express.Router();

router.post( "/", auth, createTicket);

router.get("/", auth, getTickets);
router.put("/:id", auth, updateTicketStatus);

module.exports = router;
