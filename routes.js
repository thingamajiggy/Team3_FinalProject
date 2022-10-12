const express = require("express");
const Customer = require("./customer");
const Components = require("./components");
const Supplier = require("./supplier");
const router = express.Router();

router.post("/components/", (req, res) => {
  const { component, stockLevel, triggerPoint } = req.body;

  const components = new Components({
    component,
    stockLevel,
    triggerPoint,
  });

  try {
    const dataToSave = components.save();
    res.status(201).json(dataToSave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/components/", async (req, res) => {
  try {
    const data = await Components.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/components/:id", async (req, res) => {
  try {
    const data = await Components.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/components/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Components.findByIdAndUpdate(
      id, updatedData, options
    )

    res.status(201).send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/components/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Components.findByIdAndDelete(id)
    res.send(`Document with ${data.id} has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router;
