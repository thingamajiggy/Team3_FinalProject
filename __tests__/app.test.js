const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Components = require('../components');
const Order = require('../order');
const Product = require('../product');
require('dotenv').config();
/*connecting to the database before each test. */

beforeEach(async () => {
  await mongoose.connect(process.env.DATABASE_URL);
});
/*closing the connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

//CREATE-POST
describe('POST /components', () => {
  it('should create a new component', async () => {
    const component = {
      component: 'swallow-tail drawer back',
      stockLevel: 24,
      triggerPoint: 12,
    }
    jest.spyOn(Components.prototype, 'save')
      .mockImplementationOnce(() => component)

    const res = await request(app).post('/api/components').send();

    expect(res.statusCode).toBe(201);
    expect(res.body.component).toBe(component.component);
  });
});

//READ-GET
describe('GET /components', () => {
  it('should return all components', async () => {
    const res = await request(app).get('/api/components');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toBeInstanceOf(Object);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /components/:id', () => {
  it('should return a component with the matching id number', async () => {

    const id = 1
    const component = {
      id,
      component: 'to be decided',
      stockLevel: 42,
      triggerPoint: 21,
    }

    const findByIdSpy = jest.spyOn(Components, 'findById');
    findByIdSpy.mockImplementation(() => component)

    const res = await request(app).get(`/api/components/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(component);
    findByIdSpy.mockRestore();
  });
});

//UPDATE-PATCH
describe('PATCH /components/:id', () => {
  it('should update a product', async () => {
    const id = 2
    const component = {
      component: 'dove-tailed joit drawer back',
      stockLevel: 24,
      triggerPoint: 12,
    }

    const findByIdAndUpdateSpy = jest.spyOn(Components, 'findByIdAndUpdate');
    findByIdAndUpdateSpy.mockImplementation(() => ({ ...component, id }))

    const res = await request(app)
      .patch(`/api/components/${id}`)
      .send(component);
    expect(findByIdAndUpdateSpy).toHaveBeenCalled()
    expect(res.statusCode).toBe(201);
    expect(res.body.component).toBe('dove-tailed joit drawer back');
    expect(res.body.id).toBe(2);
    findByIdAndUpdateSpy.mockRestore();
  });
});

//DELETE-DELETE
describe('DELETE /api/components/:id', () => {
  it('should delete a product', async () => {
    const id = 2
    const findByIdAndDeleteSpy = jest.spyOn(Components, 'findByIdAndDelete');
    findByIdAndDeleteSpy.mockImplementation(() => ({ id }))
    const res = await request(app).delete(`/api/components/${id}`);
    expect(res.statusCode).toBe(200);
    findByIdAndDeleteSpy.mockRestore();
  });
});

describe('POST /order', () => {
  it('should create a new order', async () => {
    const orders = {
      _id: "634964e80ea2b3bdbc4a6910",
      product: "bed",
      quantity: 3,
      __v: 0
    }
    jest.spyOn(Order.prototype, 'save')
      .mockImplementationOnce(() => orders)

    const res = await request(app).post('/api/order').send();

    expect(res.statusCode).toBe(201);
    expect(res.body.product).toBe(orders.product);
  });
});

//READ-GET
describe('GET /order', () => {
  it('should return all order', async () => {
    const res = await request(app).get('/api/order');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toBeInstanceOf(Object);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /order/:id', () => {
  it('should return a component with the matching id number', async () => {

    const id = "634964e80ea2b3bdbc4a6910"
    const orders = {
      product: "bed",
      quantity: 3,
      __v: 0
    }

    const findByIdSpy = jest.spyOn(Order, 'findById');
    findByIdSpy.mockImplementation(() => orders)

    const res = await request(app).get(`/api/order/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(orders);
    findByIdSpy.mockRestore();
  });
});

//UPDATE-PATCH
describe('PATCH /order/:id', () => {
  it('should update a product', async () => {
    const id = "63497b0e0ea2b3bdbc4a7ea0"
    const orders = {
      product: "Success test 1",
      quantity: 10,
      __v: 0
    }
    const findByIdAndUpdateSpy = jest.spyOn(Order, 'findByIdAndUpdate');
    findByIdAndUpdateSpy.mockImplementation(() => ({ ...orders, id }))

    const res = await request(app)
      .patch(`/api/order/${id}`)
      .send(orders);
    expect(findByIdAndUpdateSpy).toHaveBeenCalled()
    expect(res.statusCode).toBe(201);
    expect(res.body.product).toBe('Success test 1');
    expect(res.body.id).toBe("63497b0e0ea2b3bdbc4a7ea0");
    findByIdAndUpdateSpy.mockRestore();
  });
});

//DELETE-DELETE
describe('DELETE /api/order/:id', () => {
  it('should delete a product', async () => {
    const id = "63497b0e0ea2b3bdbc4a7ea0"
    const findByIdAndDeleteSpy = jest.spyOn(Order, 'findByIdAndDelete');
    findByIdAndDeleteSpy.mockImplementation(() => ({ id }))
    const res = await request(app).delete(`/api/order/${id}`);
    expect(res.statusCode).toBe(200);
    findByIdAndDeleteSpy.mockRestore();
  });
});

describe('POST /product', () => {
  it('should create a new product', async () => {
    const productName = "Sofa"
    const components = [
      {
        componentId: "6346f0c5e9aabf89b3a43cf5",
        component: "leg",
        quantity: 2,
        _id: "634813d3751123cec035b45d"
      }
      ,
      {
        componentId: "6347d1821ae4f5c6ac86bdd0", component: "cushion",
        quantity: 4,
        _id: "634813d3751123cec035b45e"
      }
    ]

    const products = {
      _id: "634813d3751123cec035b45c",
      productName,
      components
      , __v: 0
    }

    jest.spyOn(Product.prototype, 'save')
      .mockImplementationOnce(() => products)

    const res = await request(app).post('/api/product').send({
      components,
      productName,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.components).toEqual(products.components);
  });
});

//READ-GET
describe('GET /order', () => {
  it('should return all order', async () => {
    const res = await request(app).get('/api/order');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toBeInstanceOf(Object);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /order/:id', () => {
  it('should return a component with the matching id number', async () => {

    const id = "634964e80ea2b3bdbc4a6910"
    const orders = {
      product: "bed",
      quantity: 3,
      __v: 0
    }

    const findByIdSpy = jest.spyOn(Order, 'findById');
    findByIdSpy.mockImplementation(() => orders)

    const res = await request(app).get(`/api/order/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(orders);
    findByIdSpy.mockRestore();
  });
});

//UPDATE-PATCH
describe('PATCH /order/:id', () => {
  it('should update a product', async () => {
    const id = "63497b0e0ea2b3bdbc4a7ea0"
    const orders = {
      product: "Success test 1",
      quantity: 10,
      __v: 0
    }
    const findByIdAndUpdateSpy = jest.spyOn(Order, 'findByIdAndUpdate');
    findByIdAndUpdateSpy.mockImplementation(() => ({ ...orders, id }))

    const res = await request(app)
      .patch(`/api/order/${id}`)
      .send(orders);
    expect(findByIdAndUpdateSpy).toHaveBeenCalled()
    expect(res.statusCode).toBe(201);
    expect(res.body.product).toBe('Success test 1');
    expect(res.body.id).toBe("63497b0e0ea2b3bdbc4a7ea0");
    findByIdAndUpdateSpy.mockRestore();
  });
});

//DELETE-DELETE
describe('DELETE /api/order/:id', () => {
  it('should delete a product', async () => {
    const id = "63497b0e0ea2b3bdbc4a7ea0"
    const findByIdAndDeleteSpy = jest.spyOn(Order, 'findByIdAndDelete');
    findByIdAndDeleteSpy.mockImplementation(() => ({ id }))
    const res = await request(app).delete(`/api/order/${id}`);
    expect(res.statusCode).toBe(200);
    findByIdAndDeleteSpy.mockRestore();
  });
});