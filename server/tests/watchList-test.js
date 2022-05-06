const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
chai.use(chaiHttp);
chai.should();

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0YzNlMjU3ZWU2ZmIzYjNiZDAyZjQ3IiwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJ0eXBlIjoiVXNlciJ9LCJpYXQiOjE2NTE4NjIxMzcsImV4cCI6MTY1MTg2MjQ5N30.Vq9SVYs78O5KEljbs3fcnwiUmffAePShy_b2ZAVGjFA"
describe('Add to watch list', () => {
    describe('/POST Add to watchlist', () => {
        it('it should success with status 200', (done) => {
            const data = {
                user: {id: "624c3e257ee6fb3b3bd02f47"},
                id: 2323,
                genre_ids: [1, 2, 3],
                overview: "Overview",
                poster_path: "Poster path",
                release_date: "Release date",
                title: "Title",
            }
            chai.request(server)
                .post('/api/watchlist/add')
                .set({ Authorization: `Bearer ${accessToken}` })
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('Result').have.string('Success');
                    done();
                });
        });
        it('it should fail with status 400 , because cannot add duplicated movies', (done) => {
            const data = {
                user: {id: "624c3e257ee6fb3b3bd02f47"},
                id: 2323,
                genre_ids: [1, 2, 3],
                overview: "Overview",
                poster_path: "Poster path",
                release_date: "Release date",
                title: "Title",
            }
            chai.request(server)
                .post('/api/watchlist/add')
                .set({ Authorization: `Bearer ${accessToken}` })
                .send(data)
                .end((err, res) => {
                    res.should.have.status(409);
                    done();
                });
        });

    });
    describe('/DELETE Remove from watchlist', () => {

        it('it should success with status 200', (done) => {
            const data = {
                user: {id: "624c3e257ee6fb3b3bd02f47"},
                id: 2323,
            }
            chai.request(server)
                .delete('/api/watchlist/remove')
                .send(data)
                .set({ Authorization: `Bearer ${accessToken}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('Result').have.string('Success');
                    done();
                });
        });
        it('it should fail with status 400 , because cannot remove not existing movie', (done) => {
            const data = {
                user: {id: "624c3e257ee6fb3b3bd02f47"},
                id: 2323,
            }
            chai.request(server)
                .delete('/api/watchlist/remove')
                .send(data)
                .set({ Authorization: `Bearer ${accessToken}` })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});
