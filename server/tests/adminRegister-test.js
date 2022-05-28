const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const authService = require("../user/service");
chai.should();
chai.use(chaiHttp);

describe('Register Admin', () => {
    describe('/POST Register Admin with valid credentials', () => {
        it('it should return jwt token with status 200', (done) => {
            let credentials = {
                email: "admin777777777@email.com",
                password: "admin23123123",
            }
            chai.request(server)
                .post('/api/user/register-admin')
                .send({...credentials})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('Result').have.string('Success');
                    done();

                });
        });
        after(async  () => {
            await authService.deleteUser("admin777777777@email.com");
        });

    });
    describe('/POST Register Admin with invalid credentials', () => {
        it('it should fail with status 400 , because admin is not a valid email', (done) => {
            let credentials = {
                email: "admin",
                password: "admin",
            }
            chai.request(server)
                .post('/api/user/register-admin')
                .send({...credentials})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

    });

});
