const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
chai.use(chaiHttp);
chai.should();

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0YzNlMjU3ZWU2ZmIzYjNiZDAyZjQ3IiwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJ0eXBlIjoiVXNlciJ9LCJpYXQiOjE2NTE4NjMxOTMsImV4cCI6MTY4MzM5OTE5M30.ZiAxMpGzneDHjqBRmr1PiR8fXoTrXA0DLjR2_O3W-bQ"
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
                type:"MOVIE"
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
                type:"MOVIE"
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
            chai.request(server)
                .delete('/api/watchlist/remove/624c3e257ee6fb3b3bd02f47/2323')
                .set({ Authorization: `Bearer ${accessToken}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('Result').have.string('Success');
                    done();
                });
        });
        it('it should fail with status 400 , because cannot remove not existing movie', (done) => {
            chai.request(server)
                .delete('/api/watchlist/remove/624c3e257ee6fb3b3bd02f47/23433')
                .set({ Authorization: `Bearer ${accessToken}` })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});
