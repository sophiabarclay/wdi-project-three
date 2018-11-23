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
    email: 'ja@ja',
    password: 'Password1',
    passwordConfirmation: 'Password1',
    image: 'https://thejazzcafelondon.com/wp-content/themes/jazz-cafe-fs/images/jazz-cafe.png',
    isVenue: true,
    openingHours: '17:00-03:00'
  },
  {
    _id: userIds[3],
    username: 'Eventim Apollo',
    email: 'ev@ev',
    password: 'Password1',
    passwordConfirmation: 'Password1',
    image: 'https://ents24.imgix.net/image/000/126/282/5bcbc9304d731d8270ee7079daf83a1f93bfd067.jpg?w=358&h=268&auto=format&fit=crop&crop=entropy',
    isVenue: true,
    openingHours: '17:00-03:00'
  },
  {
    _id: userIds[2],
    username: 'Juju\'s Bar',
    email: 'ju@ju',
    password: 'Password1',
    passwordConfirmation: 'Password1',
    image: 'http://www.jujusbarandstage.com/images/logo_black.png',
    isVenue: true,
    openingHours: '19:00-06:00'
  },
  {
    _id: userIds[6],
    username: 'Sketch',
    email: 'sk@sk',
    password: 'Password1',
    passwordConfirmation: 'Password1',
    image: 'https://pbs.twimg.com/profile_images/697105867079086080/3TT-sUK5_400x400.jpg',
    isVenue: true,
    openingHours: '19:00-06:00'
  },
  {
    _id: userIds[1],
    username: 'Sophia',
    email: 's@s',
    password: 'Password1',
    passwordConfirmation: 'Password1',
    image: 'https://avatars0.githubusercontent.com/u/43184890?s=460&v=4',
    isVenue: false
  },
  {
    _id: userIds[4],
    username: 'Lucia',
    email: 'l@l',
    password: 'Password1',
    passwordConfirmation: 'Password1',
    image: 'https://media.licdn.com/dms/image/C4D03AQFXVQJwNbzRuA/profile-displayphoto-shrink_800_800/0?e=1548288000&v=beta&t=3BOvsnFShbPjIk2t-02pt8NxMGb-fDecrLoypuuWLdw',
    isVenue: false
  },
  {
    _id: userIds[5],
    username: 'Joe',
    email: 'j@j',
    password: 'Password1',
    passwordConfirmation: 'Password1',
    image: 'https://media.licdn.com/dms/image/C4E03AQEpXmlRCLefuQ/profile-displayphoto-shrink_800_800/0?e=1548288000&v=beta&t=wWC9bVgLY5TnvCijRIEMjb0j8O2VhtvqjMyeyyMnvXE',
    isVenue: false
  },
  {
    _id: userIds[7],
    username: 'The O2',
    email: 'o2@o2',
    password: 'Password1',
    passwordConfirmation: 'Password1',
    image: 'https://theme.zdassets.com/theme_assets/646682/f75d632fb271f77d95a5f8a028288b1c1bd1007a.jpg',
    isVenue: true,
    openingHours: '19:00-06:00'
  },
  {
    _id: userIds[8],
    username: 'Alexandra Palace',
    email: 'al@al',
    password: 'Password1',
    passwordConfirmation: 'Password1',
    image: 'http://www.alexandrapalace.com/content/themes/apnew/img/default-grid-image.png',
    isVenue: true,
    openingHours: '19:00-06:00'
  }
];

const eventData = [
  {
    title: 'Louis Cole Featuring Norrbotten Big Band',
    artist: 'Louis Cole',
    venue: 'Jazz Café',
    address: '5 Parkway, Camden Town, London NW1 7PG',
    date: '2018-12-14T00:00:00.009Z',
    description: 'One half of electronic jazz duo Knower, Louis Cole has stepped out this year with an excellent solo record on Brainfeeder, Time.',
    image: 'https://www.ninjatune.net/images/artists/louis-cole-main.jpg',
    comments: [],
    createdBy: userIds[0],
    attendees: userIds[1]
  },
  {
    title: 'Wolf Alice',
    artist: 'Wolf Alice',
    venue: 'Alexandra Palace',
    address: 'Alexandra Palace Way, London N22 7AY',
    date: '2018-11-04T00:00:00.009Z',
    description: 'Following their recent announcement of their new album ‘Visions of a Life’ out in September, the band have announced both US and Euorpean tour dates, including their biggest headline show to date at the Palace in November. Special guests Sunflower Bean and Superfood will be supporting.',
    image: 'http://www.alexandrapalace.com/content/uploads/2017/06/image-71-627x452.jpg',
    comments: [],
    createdBy: userIds[8],
    attendees: []
  },
  {
    title: 'Tilted?',
    artist: 'Christine & The Queens',
    venue: 'Eventim Apollo Hammersmith',
    address: '45 Queen Caroline St, London, W6 9QH ',
    date: '2018-11-20T00:00:00.009Z',
    description: 'The introductory music swelled, the stage lights rose and revealed... six people having an argument. Héloïse Letissier, or Christine, now known by the mononym Chris, soon arrived to sort them out through the power of dance, West Side Story style. So began a thrilling evening powered by restless movement, Gallic electrofunk and a visual surprise at every turn.',
    image: 'https://static.standard.co.uk/s3fs-public/thumbnails/image/2018/11/21/10/Christine-and-the-Queens.jpg?w968',
    comments: [],
    createdBy: userIds[3],
    attendees: userIds[1]
  },
  {
    title: 'Live Nation',
    artist: 'Morgan James',
    venue: 'Jazz Café',
    address: '17 Hanbury St, London E1 6QR',
    date: '2018-11-26T00:00:00.009Z',
    description: 'One voice is all it takes. The right vocalist can make you fall in love at first listen, elicit tears, or bring you back to a different era altogether. A microphone and a stage remain the only necessities. That holds true for New York-based soul singer and songwriter Morgan James.',
    image: 'https://thejazzcafelondon.com/wp-content/uploads/2018/06/MORGAN-JAMES_INSTA-500x300.jpg',
    comments: [],
    createdBy: userIds[0],
    attendees: []
  },
  {
    title: 'Floacist',
    artist: 'Natalie ‘Floacist’ Stewart',
    venue: 'Jazz Café',
    address: '5 Parkway, Camden, London, NW1 7PG',
    date: '2018-11-08T00:00:00.009Z',
    description: 'Natalie ‘Floacist’ Stewart is a founding original member of the ground breaking seven-time Grammy nominated, platinum selling, UK and international neo-soul sensation Floetry alongside Marsha Ambrosius.',
    image: 'https://thejazzcafelondon.com/wp-content/uploads/2018/08/flo-copy-500x300.jpg',
    comments: [],
    createdBy: userIds[0],
    attendees: []
  },
  {
    title: 'The Miseducation of Lauryn Hill',
    artist: 'Ms. Lauryn Hill',
    venue: 'The O2 Arena',
    address: '5 Parkway, Camden, London, NW1 7PG',
    date: '2018-12-03T00:00:00.009Z',
    description: 'Ms. Lauryn Hill is bringing her Miseducation of Lauryn Hill 20th Anniversary tour to The O2 on 3 December, celebrating twenty years of her anthemic debut solo album. She will be joined by special guests Cory Henry and The Funk Apostles, Shabazz Palaces, Digable Planets and Ko-Jo Cue & Shaker.',
    image: 'https://www.theo2.co.uk/assets/img/1200-x-628-landscape-33c9d02076.jpg',
    comments: [],
    createdBy: userIds[7],
    attendees: []
  },
  {
    title: 'A Deeper Understanding',
    artist: 'The War On Drugs',
    venue: 'The O2 Arena',
    address: 'Peninsula Square, London SE10 0DX',
    date: '2018-12-13T00:00:00.009Z',
    description: 'The War On Drugs have announced their only UK headline show of 2018 – a very special gig at The O2, London on Thursday 13 December 2018. Their fourth album, the 2017 release “A Deeper Understanding”, garnered huge critical acclaim and praise for the Philadelphian band, picking up from where their 2014 masterpiece “Lost in the Dream” left off, and winning them a Grammy Award in the process. This European arena tour wraps up a triumphant 2018 for Adam Granduciel and his band.',
    image: 'https://images-na.ssl-images-amazon.com/images/I/81IRbCARLfL._SL1425_.jpg',
    comments: [],
    createdBy: userIds[7],
    attendees: []
  },
  {
    title: 'The 1975',
    artist: 'The 1975',
    venue: 'The O2 Arena',
    address: 'Peninsula Square, London SE10 0DX',
    date: '2019-01-18T00:00:00.009Z',
    description: 'The 1975 today announced a UK arena tour, stopping at The O2 on Friday 18 January 2019.',
    image: 'https://www.theo2.co.uk/assets/img/The-1975-UK-Fb20-979a8e19af.jpg',
    comments: [],
    createdBy: userIds[7],
    attendees: []
  },
  {
    title: 'Mezzanine XX1',
    artist: 'Massive Attack',
    venue: 'The O2 Arena',
    address: 'Peninsula Square, London SE10 0DX',
    date: '2019-02-22T00:00:00.009Z',
    description: 'Massive Attack will be bringing their brand new show to The O2 next February. Mezzanine XX1 will be a totally new audio / visual production featuring Elizabeth Fraser and designed by Robert Del Naja, with collaborators to be announced at a later date.',
    image: 'https://eventmagazin.info/wp-content/uploads/2017/12/Massive-Attack-c-MCT.jpg',
    comments: [],
    createdBy: userIds[7],
    attendees: []
  },
  {
    title: 'CHVRCHES',
    artist: 'CHVRCHES',
    venue: 'Alexandra Palace',
    address: 'Alexandra Palace Way, London N22 7AY',
    date: '2019-02-22T00:00:00.009Z',
    description: 'Glasgow-based CHVRCHES released their third full-length album Love Is Dead earlier this year, having previously dropped The Bones of What You Believe in 2013, and Every Open Eye in 2015.',
    image: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/117E2/production/_101105617_bb04344a-edef-41cd-9201-1fec0b0478dc.jpg',
    comments: [],
    createdBy: userIds[8],
    attendees: []
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
