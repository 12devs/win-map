const request = require('supertest');
const container = request('http://localhost:8081');
const Models = require('../src/models');

describe('Auth', () => {

  const username = `test_user_${Date()}`;
  const password = 'test_pass';

  console.log('test process.env.NODE_ENV', process.env.NODE_ENV);

  afterAll(() => {
    return Models.Account.destroy({ where: { login: username } })
      .then((res) => {
        console.log('df', res);
      })
      .catch((res) => {
        console.log('er', res);

      })
  });

  it('registration with empty request body', (done) => {
    return container
      .post('/publicRouts/register')
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((err) => {
        if (err) {
          done(err);
          return;
        }
        console.log('1');
        done();
      });
  });

  it('registration with correct data', (done) => {
    return container
      .post('/publicRouts/register')
      .set('Content-Type', 'application/json')
      .send({ login: username, password: password })
      .expect(200)
      .end((err) => {
        if (err) {
          done(err);
          return;
        }
        console.log('2');

        done();
      });
  });

  it('authorization with empty request body', (done) => {

    return container
      .post('/publicRouts/login')
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((err) => {
        if (err) {
          done(err);
          return;
        }
        console.log('3');

        done();
      });
  });

  it('authorization with correct login and password', (done) => {

    return container
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
        console.log('4');

        done();
      });
  });

  it('authorization with incorrect username or password', (done) => {
    return container
      .post('/publicRouts/login')
      .set('Content-Type', 'application/json')
      .send({ login: username, password: "test1" })
      .expect(500)
      .end((err) => {
        if (err) {
          done(err);
          return;
        }
        console.log('5');

        done();
      });
  });

});
