const express = require("express");
const router = express.Router(); // Adjust path as needed

// Create a new form
router.post("/", async (req, res) => {
  try {
    const { name, status, fields } = req.body;

    if (!name || !Array.isArray(fields) || fields.length === 0) {
      return res.status(400).json({ error: "Invalid form data" });
    }

    const newForm = await global.db.models.Form.create({
      name,
      status,
      fields: JSON.stringify(fields),
    });

    res.status(201).json(newForm);
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all forms
router.get("/", async (req, res) => {
  try {
    const forms = await global.db.models.Form.findAll();
    const formatted = forms.map((form) => ({
      ...form.toJSON(), // fields is already parsed
    }));
    res.json(formatted);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Delete a form
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await global.db.models.Form.destroy({ where: { id } });

    if (deleted) {
      return res.json({ message: "Form deleted successfully" });
    }

    res.status(404).json({ error: "Form not found" });
  } catch (error) {
    console.error("Error deleting form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update form status
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, fields } = req.body;

    // Find the form
    const form = await global.db.models.Form.findByPk(id);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    // Update the form
    await form.update({
      name: name || form.name,
      status: status || form.status,
      fields: fields || form.fields,
    });

    res.status(200).json({ message: "Form updated successfully" });
  } catch (error) {
    console.error("Error updating form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
