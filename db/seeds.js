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
    password: 'Password1',
    image: 'https://thejazzcafelondon.com/wp-content/themes/jazz-cafe-fs/images/jazz-cafe.png',
    isVenue: true,
    address: '5 Parkway, Camden Town, London NW1 7PG',
    openingHours: '17:00-03:00'
  }, {
    _id: userIds[1],
    username: 'Sophia',
    email: 's@s',
    password: 'Password1',
    image: 'http://www.sunflowerhospital.in/wp-content/uploads/2017/09/profile-img.jpg',
    isVenue: false
  }
];

const eventData = [
  {
    title: 'Event',
    artist: 'Artist',
    venue: 'Venue',
    date: 2018,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et ille ridens: Video, inquit, quid agas; Hoc est non dividere, sed frangere. Sed quid sentiat, non videtis. Sed haec omittamus; Equidem etiam Epicurum, in physicis quidem, Democriteum puto.',
    image: 'https://lh5.googleusercontent.com/p/AF1QipNrsELqnSp4SssWL_z2FRE5rbjLWkciQ7_-9t4s=w239-h160-k-no',
    comments: [],
    createdBy: userIds[0],
    attendees: userIds[1]
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
