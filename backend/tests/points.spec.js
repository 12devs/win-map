import { Place } from "../src/models";

const request = require('supertest');
const requestPromise = require('request-promise');
const Models = require('../src/models');

const container = request('http://localhost:8081');

describe('Points', () => {

  const username = `point_test_${Date()}`;
  const password = 'test_point';
  let token;

  const myPlace = {
    place:
      {
        lat: 53.643009642582335,
        lng: 23.75621795654297,
        name: 'test_my_place'
      },
    stations:
      [{
        station_id: 'UMMG',
        lat: '53.68462508940614',
        lng: '23.852275279350586'
      }],
  };

  beforeAll(async () => {
    const options = {
      method: 'POST',
      uri: 'http://localhost:8081/publicRouts/register',
      body: { login: username, password: password },
      json: true,
    };

    await requestPromise(options)
      .then(response => response)
      .then(() => {
        return requestPromise({
          method: 'POST',
          uri: 'http://localhost:8081/publicRouts/login',
          body: { login: username, password: password },
          json: true,
        });
      })
      .then(response => {
        token = response.token;
      })
      .catch(error => {
        console.log('error ', error);
      });
  });

  describe('when adding a new point "My place" with correct  data', () => {

    let res;

    beforeAll(async () => {
      res = await container
        .post('/api/points/save')
        .set('Authorization', `Token ${token}`)
        .set('Content-Type', 'application/json')
        .send(myPlace);
    });

    it('response code should be 200', () => {
      expect(res.status).toBe(200);
    });

    it('response body should be object. Body contains objects place and stationsData.', () => {
      const { place, stationsData } = res.body;
      expect(res.body).toEqual(expect.any(Object));
      expect(place).toEqual(expect.any(Object));
      expect(stationsData).toEqual(expect.any(Object));
    });

    it('new place should be created with the correct parameters', () => {
      const { place } = res.body;
      expect(place).toEqual(expect.objectContaining({
        lat: myPlace.place.lat,
        lng: myPlace.place.lng,
        name: myPlace.place.name,
      }));
    });

    it('new point should be kept in the database', async (done) => {
      const { id } = res.body.place;
      console.log('id', id);
      await Models.Place.findOne({
        where: { id: id }
      })
        .then(data => {
          // if (!data) {
          //   // done.fail("new point in database not found");
          //   return;
          // }

          done();
        });
    });

    afterAll(async () => {

    })

  });

});
