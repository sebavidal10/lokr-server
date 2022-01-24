const request = require('supertest');
const app = require('../../../index');

const Resource = require('../../models/resourceModel');

const dbResources = {
  branStark: {
    name: 'Bran Stark',
    url: 'https://www.branstark.com',
  },
  jonSnow: {
    name: 'Jon Snow',
    url: 'https://www.jonsnow.com',
  },
};

beforeEach(async () => {
  await Resource.deleteMany({});
});

afterEach(async () => {
  await Resource.deleteMany({});
});

describe('Test Resource Controllers', () => {
  it('should return a list of resources', async () => {
    await Resource.insertMany([dbResources.branStark, dbResources.jonSnow]);
    const response = await request(app).get(`/resources`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it('should fail returning a list of resources with code 500', async () => {
    Resource.find = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    const response = await request(app).get(`/resources`);
    expect(response.status).toBe(500);
  });

  it('should create a resource', async () => {
    await request(app).post(`/resources`).send(dbResources.branStark);

    expect(await Resource.findOne({ name: 'Bran Stark' })).toBeTruthy();
  });

  it('should fail creating a resource in validate (code 400)', async () => {
    const response = await request(app)
      .post(`/resources`)
      .send({ name: 'Bran Stark' });
    expect(response.status).toBe(400);
  });
});
