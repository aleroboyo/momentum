import mongoose, { Schema, Document, models } from 'mongoose'

export interface ILog extends Document {
  habitId: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  value: number
  date: Date
}

const LogSchema: Schema = new Schema({
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
})

LogSchema.index({ habitId: 1, date: 1 }, { unique: true })

const Log = models.Log || mongoose.model<ILog>('Log', LogSchema)
export default Log