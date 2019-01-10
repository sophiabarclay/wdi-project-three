const port = process.env.PORT || 4000;
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/gighub';
const secret = process.env.SECRET || 'jusia';


module.exports = { port, dbUri, secret };
