const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const Review = require("../reviews/model");
chai.should();
chai.use(chaiHttp);

let review
const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0YzNlMjU3ZWU2ZmIzYjNiZDAyZjQ3IiwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJ0eXBlIjoiQWRtaW4ifSwiaWF0IjoxNjUzNzYwNTM2LCJleHAiOjE2ODUyOTY1MzZ9.Cg8Ln-suX_Tln9wuG513u00jCNYyaaZ7cSRPn8RLR44"
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0YzNlMjU3ZWU2ZmIzYjNiZDAyZjQ3IiwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJ0eXBlIjoiVXNlciJ9LCJpYXQiOjE2NTE4NjMxOTMsImV4cCI6MTY4MzM5OTE5M30.ZiAxMpGzneDHjqBRmr1PiR8fXoTrXA0DLjR2_O3W-bQ"
describe('Test review functionality', () => {
    describe('Test adding review', () => {
        it('it should create a new review', (done) => {
            const data = {
                movieID: 123,
                text: "Test text",
                recommendation: true,
                type: "asdf",
                movieTitle: "Movie",
            }
            chai.request(server)
                .post('/api/review/add')
                .set({ Authorization: `Bearer ${accessToken}` })
                .send({...data})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('review');
                    done();
                });
        });
        describe('Get the new review',  () => {
           it('it should pull the review from before',async ()=>{
               review = await Review.findOne({movieID: 123 ,userID : "624c3e257ee6fb3b3bd02f47" })
               review.should.have.property('_id');
           })
        });

    });
    describe('/ADD report to the review', () => {
        it('it should succeed in adding a report to the review', (done) => {
            let data = {
                reviewId: review._id.toString(),
                subject: "Txt",
                text: "Txt txt",
                reportedBy: "admin@email.com"
            }
            chai.request(server)
                .post('/api/report/report-add')
                .send({...data})
                .set({ Authorization: `Bearer ${accessToken}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('Result').have.string('Success');
                    done();
                });
        });

    });
    describe('/DELETE Review successfully', () => {
        it('it should delete the review', (done) => {

            chai.request(server)
                .delete('/api/review/remove/'+review._id.toString())
                .set({ Authorization: `Bearer ${adminToken}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('Result').have.string('Success');
                    done();
                });
        });

    });

});
