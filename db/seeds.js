const mongoose = require('mongoose');
const env = require('../config/environment');
const Event = require('../models/event');
const User = require('../models/user');
mongoose.connect(env.dbUri);

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
    comments: [],
    createdBy: userIds[0],
    attendees: userIds[0]
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
