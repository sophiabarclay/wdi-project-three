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

let token;

describe('Events DELETE', () => {
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
    api.delete(`/api/events/${eventId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 204 with a token', done => {
    api.delete(`/api/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204);
      });
    done();
  });

  it('should delete the event', done => {
    api.delete(`/api/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`)
      .then(() => Event.find())
      .then(events => {
        expect(events.length).to.eq(0);

      });
    done();
  });
});
