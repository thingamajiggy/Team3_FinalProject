const express = require('express');
const Customer = require('./model/customer')
const Furniture = require('./model/furniture')
const Supplier = require('./model/supplier')

const router = express.Router()



router.post('/customer/', (req, res) => {
    const { name, phoneNumber, orderDate, furnitureOrder } = req.body;

    const customer = new Customer({
        name, phoneNumber, orderDate, furnitureOrder
    })

    try {
        const dataToSave = customer.save();

        res.status(200).json(dataToSave)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/supplier/', (req, res) => {
    const { name, phoneNumber, materialsOrderNo, orderDate, deliveryDate } = req.body;

    const supplier = new Supplier({
        name, phoneNumber, materialsOrderNo, orderDate, deliveryDate
    })

    try {
        const dataToSave = supplier.save();

        res.status(200).json(dataToSave)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/furniture/', (req, res) => {
    const { name, inventory, sku, unitPrice, modelMaterial, finished, partOf } = req.body;

    const furniture = new Furniture({
        name, inventory, sku, unitPrice, modelMaterial, finished, partOf
    })

    try {
        const dataToSave = furniture.save();

        res.status(200).json(dataToSave)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



router.get('/customer/', async (req, res) => {
    try {
        const data = await Customer.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/supplier/', async (req, res) => {
    try {
        const data = await Supplier.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/furniture/', async (req, res) => {
    try {
        const data = await Furniture.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});



router.get('/customer/:id', async (req, res) => {
    try {
        const data = await Customer.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/supplier/:id', async (req, res) => {
    try {
        const data = await Supplier.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/furniture/:id', async (req, res) => {
    try {
        const data = await Furniture.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;