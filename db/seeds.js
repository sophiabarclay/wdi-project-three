const mongoose = require('mongoose');
const env = require('../config/environment');
const Event = require('../models/event');
const User = require('../models/user');
mongoose.connect(env.dbUri);

const userIds = [
  '5be9860fcb16d525543ceda2'
];

const userData = [
  {
    _id: userIds[0],
    username: 'test',
    email: 'test@test',
    password: 'pass',
    image: 'test',
    eventsAttending: ['test'],
    isVenue: true,
    address: 'test',
    openingHours: 'test'
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

Event.collection.drop();
User.collection.drop();

Event
  .create(eventData)
  .then(events => {
    console.log(`Created ${events.length} events`);
    User
      .create(userData)
      .then(users => {
        console.log(`Created ${users.length} users`);
        mongoose.connection.close();
      });
  });
