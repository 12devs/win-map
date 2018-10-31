const request = require('supertest');
const container = request('http://localhost:8081');

describe('Auth', () => {

  it('authorization with empty request body', (done) => {

    container
      .post('/publicRouts/login')
      .set('Content-Type', 'application/json')
      .expect(500)
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

});
