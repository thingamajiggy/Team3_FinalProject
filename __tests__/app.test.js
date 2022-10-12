const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Components = require('../components');
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
      component: 'dove-tailed joint drawer back',
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
    expect(res.body.component).toBe('dove-tailed joint drawer back');
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