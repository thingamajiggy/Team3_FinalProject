const express = require("express");
const Order = require("./order");
const Components = require("./components");
const Product = require("./product");
const router = express.Router();

router.post("/components/", async (req, res) => {
  const { component, stockLevel, triggerPoint } = req.body;

  const components = new Components({
    component,
    stockLevel,
    triggerPoint,
  });

  try {
    const dataToSave = await components.save();
    res.status(201).json(dataToSave);
  }

  catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/components/", async (req, res) => {
  try {
    const data = await Components.find();
    res.json(data);
  }

  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/components/:id", async (req, res) => {
  try {
    const data = await Components.findById(req.params.id);
    res.json(data);
  }

  catch (error) {
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

router.post("/order/", async (req, res) => {
  const { product, quantity } = req.body;

  const orders = new Order({
    product,
    quantity,
  });

  try {
    const dataToSave = await orders.save();
    res.status(201).json(dataToSave);
  }

  catch (err) {
    res.status(400).json({ message: err.message });
  }

});

router.get("/order/", async (req, res) => {
  try {
    const data = await Order.find();
    res.json(data);
  }

  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/order/:id", async (req, res) => {
  try {
    const data = await Order.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/order/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Order.findByIdAndUpdate(
      id, updatedData, options
    )

    res.status(201).send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/order/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Order.findByIdAndDelete(id)
    res.send(`Document with ${data.id} has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.post("/product/", async (req, res) => {
  const { productName, components } = req.body;

  try {
    components.map(({ componentId, component, quantity }) => {

      const productConnectedTocomponent = Components.findById(componentId);

      if (quantity > productConnectedTocomponent.stockLevel) {
        return res.status(401).json({ message: `insufficient stock level for component ${componentId}` });
      } else if (productConnectedTocomponent.stockLevel - quantity <= productConnectedTocomponent.triggerPoint) {
        return res.status(201).send(component)
        //or send {message : 'order the components more'}
      }
    })

    const product = new Product({
      productName,
      components,
    });
    const dataToSave = await product.save();
    res.status(201).json(dataToSave);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/product/", async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  }

  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Product.findByIdAndUpdate(
      id, updatedData, options
    )
    res.status(201).send(result)
  }

  catch (error) {
    res.status(400).json({ message: error.message })
  }

})

router.delete('/product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await product.findByIdAndDelete(id)
    res.send(`Document with ${data.id} has been deleted..`)
  }

  catch (error) {
    res.status(400).json({ message: error.message })
  }

})

module.exports = router;
