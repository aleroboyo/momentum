import mongoose, { Schema, Document, models } from 'mongoose'

export interface IHabit extends Document {
  userId: mongoose.Types.ObjectId  
  name: string                     
  icon: string                     
  frequency: string                
  target: number                   
  unit: string                    
  createdAt?: Date
}

const HabitSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true  
  },
  icon: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true,
    enum: ['daily', 'weekly']  
  },
  target: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
}, {
  timestamps: true  
})

const Habit = models.Habit || mongoose.model<IHabit>('Habit', HabitSchema)

export default Habit
