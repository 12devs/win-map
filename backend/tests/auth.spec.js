const request = require('supertest');
const container = request('http://localhost:8081');

describe('Auth', () => {

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
      .send({ login: "test", password: "test" })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res.text).toEqual(expect.any(String));
        const body = JSON.parse(res.text);
        expect(body.token).toEqual(expect.any(String));
        expect(body.token).toHaveLength(160);
        done();
      });
  });

  it('authorization with incorrect username or password', (done) => {
    container
      .post('/publicRouts/login')
      .set('Content-Type', 'application/json')
      .send({ login: "test1", password: "test1" })
      .expect(500)
      .end((err) => {
        if (err) {
          done(err);
          return;
        }

        done();
      });
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
      .send({ login: "jest_test", password: "jest_test" })
      .expect(200)
      .end((err) => {
        if (err) {
          done(err);
          return;
        }

        done();
      });
  });
});
