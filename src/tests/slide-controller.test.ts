const { describe, expect, it } = require('@jest/globals');
const supertest = require('supertest');
import appServer from '../index'


const mockSlidesData = [
  {
    "id": "4",
    "artist" : "Skepta",
    "title" : "Shutdown",
    "album" : "Konnichiwa",
    "imageName": "2.jpg",
    "audioName": "2.mp3"
  }
];

const expectedResult = [
  {
    "id": '4',
    "artist": 'Skepta',
    "title": 'Shutdown',
    "album": 'Konnichiwa',
    "image_url": "http://127.0.0.1:8080/images/2.jpg",
    "audio_url": "http://127.0.0.1:8080/audio/2.mp3",
  }
]



// Set up the Express route for testing
jest.mock('../db/slides.json', () => mockSlidesData);

describe('getSlides API', () => {
  it('should return a list of slides when the request is successful!', async () => {
    const response = await supertest(appServer).get('/slides');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResult);
  });

  afterAll(() => {
    appServer.closeAllConnections();
    appServer.close();
  })

});


// jest.mock('../db/slides.json', () => ({}));

// describe('getSlides API', () => {
//   it('should handle errors and return a 400 status when unable to get data', async () => {
//     const response = await supertest(appServer).get('/slides');
//     expect(response.status).toBe(400);
//   });
// });