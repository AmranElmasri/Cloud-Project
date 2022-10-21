import supertest from 'supertest';
import app from '../app.js';
import { buildDb, connection } from '../database/config/index.js';

const newImage = {
  key: 'test',
  image: 'https://img.freepik.com/free-vector/software-code-testing-concept-illustration_114360-8414.jpg?w=2000',
};

let today = new Date();
let dd = String(today.getDate() -1).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = String(today.getFullYear());

today = yyyy + '-' + mm + '-' + dd + 'T21:00:00.000Z';

const retrievedImage = {
  id: 1,
  key: 'test',
  image: 'https://img.freepik.com/free-vector/software-code-testing-concept-illustration_114360-8414.jpg?w=2000',
  posting_date: today, 
}

beforeAll(() => buildDb());

describe(' Add new image ', () => {
  test('POST: test rute create new image : path => /api/v1/insert-img - should return 201 status code  ', async () => {
    const response = await supertest(app)
      .post('/api/v1/insert-img')
      .send(newImage)
      .expect(201);
    expect(response.body.message).toBe('image added successfully!');
  });
});

describe(' get image with specific key ', () => {
  test('GET: test rute get image with specific key : path => /api/v1/get-img?key=test - should return 200 status code  ', async () => {
    const response = await supertest(app)
      .get('/api/v1/get-image/?key=test')
      .expect(200);
    expect(response.body).toEqual(retrievedImage);
  });
});

describe('get all images', () => {
  test('GET: test rute get all images : path => /api/v1/get-images - should return 200 status code  ', async () => {
    const respose = await supertest(app)
    .get('/api/v1/get-images')
    .expect(200);
    expect(respose.body).toEqual([retrievedImage]);
  
  });
})


afterAll(() => connection.end());
