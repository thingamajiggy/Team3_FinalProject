const express = require("express");
const Customer = require("../models/customer");
const Components = require("../models/components");
const Supplier = require("../models/supplier");

const router = express.Router();

//POSTS
router.post("/customer/", (req, res) => {
  const { name, phoneNumber, orderDate, furnitureOrder } = req.body;

  const customer = new Customer({
    name,
    phoneNumber,
    orderDate,
    furnitureOrder,
  });

  try {
    const dataToSave = customer.save();

    res.status(200).json(dataToSave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/supplier/", (req, res) => {
  const { name, phoneNumber, materialsOrderNo, orderDate, deliveryDate } =
    req.body;

  const supplier = new Supplier({
    name,
    phoneNumber,
    materialsOrderNo,
    orderDate,
    deliveryDate,
  });

  try {
    const dataToSave = supplier.save();

    res.status(200).json(dataToSave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/components/", (req, res) => {
  const { id, component, stockLevel, triggerPoint } = req.body;

  const components = new Components({
    id,
    component,
    stockLevel,
    triggerPoint,
  });

  try {
    const dataToSave = components.save();

    res.status(200).json(dataToSave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//GETS
router.get("/customer/", async (req, res) => {
  try {
    const data = await Customer.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/supplier/", async (req, res) => {
  try {
    const data = await Supplier.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

router.get("/customer/:id", async (req, res) => {
  try {
    const data = await Customer.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/supplier/:id", async (req, res) => {
  try {
    const data = await Supplier.findById(req.params.id);
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
//PATCH

//DELETE
module.exports = router;
