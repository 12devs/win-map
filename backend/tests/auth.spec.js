const request = require('supertest');
const container = request('http://localhost:8081');
const Models = require('../src/models');

describe('Auth', () => {

  const username = `test_user_${Date()}`;
  const password = 'test_pass';

  afterAll(async () => {
    console.log('destroy1');
    await Models.Account.destroy({ where: { login: username } });
  });

  it('registration with empty request body', (done) => {
    container
      .post('/publicRouts/register')
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((err) => {
        if (err) {
          done(err);
          return;
        }

        done();
      });
  });

  it('registration with correct data', (done) => {
    container
      .post('/publicRouts/register')
      .set('Content-Type', 'application/json')
      .send({ login: username, password: password })
      .expect(200)
      .end((err) => {
        if (err) {
          done(err);
          return;
        }

        done();
      });
  });

  it('authorization with empty request body', (done) => {

    container
      .post('/publicRouts/login')
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((err) => {
        if (err) {
          done(err);
          return;
        }

        done();
      });
  });

  it('authorization with correct login and password', (done) => {

    container
      .post('/publicRouts/login')
      .set('Content-Type', 'application/json')
      .send({ login: username, password: password })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res.text).toEqual(expect.any(String));
        const body = JSON.parse(res.text);
        expect(body.token).toEqual(expect.any(String));
        // expect(body.token).toHaveLength(160);
        done();
      });
  });

  it('authorization with incorrect username or password', (done) => {
    container
      .post('/publicRouts/login')
      .set('Content-Type', 'application/json')
      .send({ login: username, password: "test1" })
      .expect(500)
      .end((err) => {
        if (err) {
          done(err);
          return;
        }

        done();
      });
  });

});
