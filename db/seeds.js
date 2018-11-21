const mongoose = require('mongoose');
const env = require('../config/environment');
const Event = require('../models/event');
const User = require('../models/user');
mongoose.connect(env.dbUri);

const userIds = [
  '5be9860fcb16d525543ceda2',
  '5be9860fcb16d525543ceda3',
  '5be9860fcb16d525543ceda4'
];

const userData = [
  {
    _id: userIds[0],
    username: 'Jazz Cafe',
    email: 'jazz@cafe',
    password: 'Password1',
    image: 'https://thejazzcafelondon.com/wp-content/themes/jazz-cafe-fs/images/jazz-cafe.png',
    isVenue: true,
    openingHours: '17:00-03:00'
  },
  {
    _id: userIds[3],
    username: 'Eventim Apollo',
    email: 'ev@ev',
    password: 'Password1',
    image: 'https://ents24.imgix.net/image/000/126/282/5bcbc9304d731d8270ee7079daf83a1f93bfd067.jpg?w=358&h=268&auto=format&fit=crop&crop=entropy',
    isVenue: true,
    openingHours: '17:00-03:00'
  },
  {
    _id: userIds[2],
    username: 'Juju\'s Bar',
    email: 'ju@ju',
    password: 'Password1',
    image: 'http://www.jujusbarandstage.com/images/logo_black.png',
    isVenue: true,
    openingHours: '19:00-06:00'
  },
  {
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
    title: 'Louis Cole Featuring Norrbotten Big Band',
    artist: 'Louis Cole',
    venue: 'Jazz Cafe',
    address: '5 Parkway, Camden Town, London NW1 7PG',
    date: 2018,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et ille ridens: Video, inquit, quid agas; Hoc est non dividere, sed frangere. Sed quid sentiat, non videtis. Sed haec omittamus; Equidem etiam Epicurum, in physicis quidem, Democriteum puto.',
    image: 'https://www.ninjatune.net/images/artists/louis-cole-main.jpg',
    comments: [],
    createdBy: userIds[0],
    attendees: userIds[1]
  },
  {
    title: 'Rock&Roll',
    artist: 'Various Artists',
    venue: 'Sketch London',
    address: '9 Conduit St, Mayfair, London W1S 2XG',
    date: 2018,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et ille ridens: Video, inquit, quid agas; Hoc est non dividere, sed frangere. Sed quid sentiat, non videtis. Sed haec omittamus; Equidem etiam Epicurum, in physicis quidem, Democriteum puto.',
    image: 'https://lh5.googleusercontent.com/p/AF1QipNrsELqnSp4SssWL_z2FRE5rbjLWkciQ7_-9t4s=w239-h160-k-no',
    comments: [],
    createdBy: userIds[0],
    attendees: userIds[1]
  },
  {
    title: 'Tilted?',
    artist: 'Christine & The Queens',
    venue: 'Eventim Apollo Hammersmith',
    address: '45 Queen Caroline St, London, W6 9QH ',
    date: 2018,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et ille ridens: Video, inquit, quid agas; Hoc est non dividere, sed frangere. Sed quid sentiat, non videtis. Sed haec omittamus; Equidem etiam Epicurum, in physicis quidem, Democriteum puto.',
    image: 'https://media.timeout.com/images/105209845/380/285/image.jpg',
    comments: [],
    createdBy: userIds[0],
    attendees: userIds[1]
  },
  {
    title: 'Live Nation',
    artist: 'Morgan James',
    venue: 'Juju\'s Bar',
    address: 'Ely\'s Yard, 15 Hanbury St, London E1 6QR',
    date: 2018,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et ille ridens: Video, inquit, quid agas; Hoc est non dividere, sed frangere. Sed quid sentiat, non videtis. Sed haec omittamus; Equidem etiam Epicurum, in physicis quidem, Democriteum puto.',
    image: 'https://thejazzcafelondon.com/wp-content/uploads/2018/06/MORGAN-JAMES_INSTA-500x300.jpg',
    comments: [],
    createdBy: userIds[2],
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
