const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true }, // Simple string for location
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  governmentAuthority: { type: mongoose.Schema.Types.ObjectId, ref: 'GovernmentAuthority', required: true },
  status: { type: String, enum: ['reported', 'in progress', 'resolved'], default: 'reported' },
  createdAt: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 },
  upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  // Flagging feature
  flags: { type: Number, default: 0 },
  flaggedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  flaggedReasons: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who flagged
      reason: { type: String, required: true }, // Reason for flagging
      flaggedAt: { type: Date, default: Date.now } // Timestamp
    }
  ],
  

  images: [
    {
      filename: { type: String, required: true },
      contentType: { type: String, required: true },
      data: { type: Buffer, required: true }, // Storing image as binary data
    }
  ],
});

module.exports = mongoose.model('Issue', issueSchema);