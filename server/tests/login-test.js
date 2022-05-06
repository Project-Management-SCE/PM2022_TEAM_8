const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
chai.should();
chai.use(chaiHttp);

describe('Login', () => {
    describe('/POST Login invalid', () => {
        it('it should fail with status 400', (done) => {
            let credentials = {
                email: "admin@email.com",
                password: "admin23123123",
            }
            chai.request(server)
                .post('/api/user/login')
                .send({...credentials})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('message').have.string('Invalid Email or password');
                    done();
                });
        });

    });
    describe('/POST Login valid', () => {
        it('it should return jwt token with status 200', (done) => {
            let credentials = {
                email: "admin@email.com",
                password: "admin",
            }
            chai.request(server)
                .post('/api/user/login')
                .send({...credentials})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('accessToken');
                    done();
                });
        });

    });

});
