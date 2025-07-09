const db = require("../../database/knex");

const saveLead = async (req, res) => {
  const {
    user_id,
    name,
    mobile,
    city,
    address,
    services,
    status = "Lead Submitted", // default value
  } = req.body;

  // Basic validation
  if (!user_id || !name || !mobile || !city || !address || !services) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const [newLead] = await db("leads")
      .insert({
        user_id,
        name,
        mobile,
        city,
        address,
        services: services.split(","),
        status,
        datetime: new Date().toISOString(),
      })
      .returning("*"); // Returns the inserted row (PostgreSQL-specific)

    res.status(200).json({
      message: "Lead saved successfully.",
      data: newLead,
    });
  } catch (error) {
    console.error("Error saving lead:", error);
    res.status(500).json({ message: "Server error while saving lead." });
  }
};

const getAllLeads = async (req, res) => {
  try {
    // Extract query parameters with default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { user_id } = req.query;

    if (!user_id)
      return res.status(404).json({ message: "Please provide the user_id." });

    const offset = (page - 1) * limit;

    // Total count
    const [{ count }] = await db("leads")
      .where("user_id", "=", user_id)
      .count("lead_id")
      .as("count");

    // Fetch leads with limit & offset
    const leads = await db("leads")
      .select("*")
      .orderBy("datetime", "desc")
      .limit(limit)
      .offset(offset);

    res.status(200).json({
      total: parseInt(count),
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      leads,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ message: "Server error while fetching leads." });
  }
};

module.exports = { saveLead, getAllLeads };
