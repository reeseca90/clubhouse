const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    createdBy: { type: String },
    dateTime: { type: Date },
    content: { type: String }
  }
);

// virtuals

// get post URL
PostSchema
.virtual('url')
.get(function () {
  return '/posts/' + this._id; 
});

// reformat date
PostSchema
.virtual('date_formatted')
.get(function () {
  return DateTime.fromJSDate(this.dateTime).toLocaleString(DateTime.DATETIME_FULL);
});

module.exports = mongoose.model('Post', PostSchema);