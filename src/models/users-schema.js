const { ObjectId } = require('mongodb');

const usersSchema = {
  name: String,
  email: String,
  password: String,
  _id: ObjectId,
  attempt: Number,
  timedout: String,
};

module.exports = usersSchema;
