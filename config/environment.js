const port = process.env.PORT || 4000;
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost/musicListing';
const secret = process.env.SECRET || 'jusia';

module.exports = { port };
