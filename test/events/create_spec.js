/* global describe, it, expect, api, beforeEach */

const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const { secret } = require('../../config/environment');

const Event = require('../../models/event');
const userIds = [
  '5be9860fcb16d525543ceda2',
  '5be9860fcb16d525543ceda3'
];
const eventData = [
  {
    title: 'test',
    artist: 'test',
    venue: 'test',
    date: 2047,
    description: 'test',
    image: 'test',
    usersAttending: [],
    comments: [],
    createdBy: userIds[0]
  }
];

let token;

describe('Events CREATE', () => {

  beforeEach(done => {
    Event.remove({})
      .then(() => User.remove({}))
      .then(() => User.create({
        email: 'test',
        username: 'test',
        password: 'test'
      }))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
        done();
      });
  });

  it('should return a 401 response without a token', done => {
    api.post('/api/events')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 201 response', done => {
    api.post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send(eventData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api.post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send(eventData)
      .end((err, res) => {
        expect(res).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send(eventData)
      .end((err, res) => {
        expect(res.body.title).to.eq(eventData.title);
        expect(res.body.artist).to.eq(eventData.artist);
        expect(res.body.venue).to.eq(eventData.venue);
        expect(res.body.date).to.eq(eventData.date);
        done();
      });
  });
});
