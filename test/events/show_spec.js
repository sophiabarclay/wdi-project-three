/* global api, expect, describe, it, beforeEach */

const Event = require('../../models/event');
const userIds = [
  '5be9860fcb16d525543ceda2',
  '5be9860fcb16d525543ceda3'
];
const eventData = [
  {
    title: 'test1',
    artist: 'test1',
    venue: 'test1',
    date: 20471,
    description: 'test1',
    image: 'test1',
    usersAttending: [],
    comments: [],
    createdBy: userIds[0]
  },
  {
    title: 'test2',
    artist: 'test2',
    venue: 'test2',
    date: 20472,
    description: 'test2',
    image: 'test2',
    usersAttending: [],
    comments: [],
    createdBy: userIds[0]
  },
  {
    title: 'test3',
    artist: 'test3',
    venue: 'test3',
    date: 20473,
    description: 'test3',
    image: 'test3',
    usersAttending: [],
    comments: [],
    createdBy: userIds[0]
  }
];

let eventId;

describe('Events SHOW', () => {

  beforeEach(done => {
    Event.remove({})
      .then(() => Event.create(eventData))
      .then(event => {
        eventId = event[0]._id;
        console.log(eventId);
        done();
      });
  });

  it('should return a 200 response', done => {
    api.get(`/api/events/${eventId}`)
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/events/${eventId}`)
      .end((err, res) => {
        // res.body is the result you would see in Insomnia
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/events/${eventId}`)
      .end((err, res) => {
        expect(res.body.title).to.eq(eventData[0].title);
        expect(res.body.artist).to.eq(eventData[0].artist);
        expect(res.body.venue).to.eq(eventData[0].venue);
        done();
      });
  });
});
