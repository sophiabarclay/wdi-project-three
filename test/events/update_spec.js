/* global api, expect, describe, it, beforeEach */
const Event = require('../../models/event');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

let eventId;

const userIds = [
  '5be9860fcb16d525543ceda2',
  '5be9860fcb16d525543ceda3'
];

const userData = [
  {
    _id: userIds[0],
    username: 'Jazz Cafe',
    email: 'jazz@cafe',
    password: 'pass',
    image: 'https://thejazzcafelondon.com/wp-content/themes/jazz-cafe-fs/images/jazz-cafe.png',
    eventsAttending: ['test'],
    isVenue: true,
    address: '5 Parkway, Camden Town, London NW1 7PG',
    openingHours: '17:00-03:00'
  }
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

const updateData = [
  {
    title: 'updated test',
    artist: 'updated test',
    venue: 'updated test',
    date: 1234,
    description: 'updated test',
    image: 'updated test',
    usersAttending: [],
    comments: [],
    createdBy: userIds[0]
  }
];

let token;

describe('Events UPDATE', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user.id }, secret, { expiresIn: '1hr' });
        return Event.remove({});
      })
      .then(() => Event.create(eventData))
      .then(event => {
        eventId = event[0]._id;
        done();
      });
  });

  it('should return a 401 without a token', done => {
    api.put(`/api/events/${eventId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 with a token', done => {
    api.put(`/api/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
      });
    done();
  });

  it('should return an object', done => {
    api.put(`/api/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

});
