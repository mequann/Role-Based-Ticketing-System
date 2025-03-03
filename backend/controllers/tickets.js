const Ticket = require("../models/Tickets");

// Create Ticket
exports.createTicket = async (req, res) => {
  const { title, description } = req.body;
  // console.log({title, description, createdBy: req.user?.id}),"llk";
  try {
    const ticket = new Ticket({ title, description, createdBy: req.user.id });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Tickets
exports.getTickets = async (req, res) => {
  try {
    const tickets =
      req.user.role === "admin"
        ? await Ticket.find()
        : await Ticket.find({ createdBy: req.user.id });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Ticket Status
exports.updateTicketStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    ticket.status = status;
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
