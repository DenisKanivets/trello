const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  boardId: {
    type: Number,
    required: true,
  },
  boardTitle: {
    type: String,
    required: true,
  },
  boardDescription: {
    type: String,
  },
  lists: [
    {
      listId: {
        type: Number,
        required: true,
      },
      listTitle: {
        type: String,
        required: true,
      },
      cards: [
        {
          cardId: {
            type: Number,
            required: true,
          },
          cardName: {
            type: String,
            required: true,
          },
          cardDescription: {
            type: String,
          },
          cardEndTime: {
            type: Date,
          },
          cardComplete: {
            type: Boolean,
          },
          cardAttachment: [],
        },
      ],
    },
  ],
});

module.exports = Board = mongoose.model('boards', BoardSchema);