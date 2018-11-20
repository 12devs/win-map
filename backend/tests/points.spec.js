const request = require('supertest');
const requestPromise = require('request-promise');
const config = require('config');
const bcrypt = require('bcryptjs');
const Models = require('../src/models');

const container = request(`http://${config.app.host}:${config.app.port}`);

describe('Points', () => {

  const user = {
    username: 'test__user',
    password: 'test__password',
    email: 'test@test_12devs.com',
    id: null,
  };

  let token;
  let myPlaceId;
  let myDangerPoint;

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

  const MyDanger = {
    danger:
      {
        lat: 53.643009642582335,
        lng: 23.75621795654297,
        name: 'test_danger'
      },
    stations:
      [{
        station_id: 'UMMG',
        lat: '53.68462508940614',
        lng: '23.852275279350586'
      }],
  };

  beforeAll(async () => {

    const account = await Models.Account.findOrCreate({
      where: {
        login: user.username,
      },
      defaults: {
        email: user.email,
        encrypted_password: bcrypt.hashSync(
          user.password,
          bcrypt.genSaltSync(config.auth.saltRound),
        ),
      },
      raw: true,
    });

    user.id = account[0].id;

    await requestPromise({
      method: 'POST',
      uri: `http://${config.app.host}:${config.app.port}/publicRouts/login`,
      body: { login: user.username, password: user.password },
      json: true,
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

      myPlaceId = res.body.place.id;
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
      await Models.Place.findOne({
        where: { id: id }
      })
        .then(data => {
          if (!data) {
            done.fail("new point in database not found");
            return;
          }

          done();
        });
    });

    afterAll(async () => {
      const { id } = res.body.place;
      await Models.Place.destroy({ where: { id: id } });
    });

  });

  describe('when adding a new point "Danger" with correct data', () => {
    let res;

    beforeAll(async () => {
      res = await container
        .post('/api/points/save')
        .set('Authorization', `Token ${token}`)
        .set('Content-Type', 'application/json')
        .send(MyDanger);

      myDangerPoint = {
        danger: Object.assign({}, res.body.danger),
        stations: [res.body.stationsData],
      };
      myDangerPoint.danger.lat = 54.532249;
      myDangerPoint.danger.lng = 30.400421;
    });

    it('response code should be 200', () => {
      expect(res.status).toBe(200);
    });

    it('response body should be object. Body contains objects place and stationsData.', () => {
      const { danger, stationsData } = res.body;
      expect(res.body).toEqual(expect.any(Object));
      expect(danger).toEqual(expect.any(Object));
      expect(stationsData).toEqual(expect.any(Object));
    });

    it('new place should be created with the correct parameters', () => {
      const { danger } = res.body;
      expect(danger).toEqual(expect.objectContaining({
        lat: MyDanger.danger.lat,
        lng: MyDanger.danger.lng,
        name: MyDanger.danger.name,
      }));
    });

    it('new point should be kept in the database', async (done) => {
      const { id } = res.body.danger;
      await Models.Danger.findOne({
        where: { id }
      })
        .then(data => {
          if (!data) {
            done.fail("new point in database not found");
            return;
          }

          done();
        });
    });

  });

  describe('when adding a new point without token', () => {
    let res;

    beforeAll(async () => {
      res = await container
        .post('/api/points/save')
        .set('Content-Type', 'application/json')
        .send(myPlace);
    });

    it('response code should be 401', () => {
      expect(res.status).toBe(401);
    });

  });

  describe('when moved the existing point', () => {
    let res;

    beforeAll(async () => {
      res = await container
        .post('/api/points/move')
        .set('Authorization', `Token ${token}`)
        .set('Content-Type', 'application/json')
        .send(myDangerPoint);
    });

    it('response code should be 200', () => {
      expect(res.status).toBe(200);
    });

    it('longitude and latitude must be updated correctly.', () => {
      const { danger } = res.body;
      expect(danger).toEqual(expect.objectContaining({
        lat: 54.532249,
        lng: 30.400421,
      }));
    });

    it('updated longitude and latitude should be stored in the database', async (done) => {
      const { id } = res.body.danger;
      await Models.Danger.findOne({
        where: { id },
        raw: true,
      })
        .then(data => {
          if (!data) {
            done.fail("point in database not found");
            return;
          }

          expect(data).toEqual(expect.objectContaining({
            id,
            lat: '54.532249',
            lng: '30.400421',
          }));

          done();
        });
    });
  });

  describe('when removed the existing point', () => {

    let res;
    let createdPoint;

    beforeAll(async () => {

      createdPoint = await Models.Danger.create({
        account_id: user.id,
        station_id: 'test',
        name: 'test',
        lat: 0,
        lng: 0,
      });

      res = await container
        .post('/api/points/delete')
        .set('Authorization', `Token ${token}`)
        .set('Content-Type', 'application/json')
        .send({
          danger: {
            id: createdPoint.id,
          }
        });

    });

    it('response code should be 200', () => {
      expect(res.status).toBe(200);
    });

    it('Danger place after deletion should be able to date removed', async (done) => {
      await Models.Danger.findOne({
        where: { id: createdPoint.id },
        raw: true,
        paranoid: false
      })
        .then(data => {
          if (!data) {
            done.fail("deleted point in database not found");
            return;
          }

          expect(data.deleted_at).toEqual(expect.any(Date));

          done();
        });
    });

  });

  afterAll(async () => {
    await Models.Danger.destroy({ where: { id: myDangerPoint.danger.id } });
  });

});
