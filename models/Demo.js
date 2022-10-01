import mongoose from 'mongoose'

const DemoSchema = new mongoose.Schema({
  demo_project: {
    type: String,
  },
})

export default mongoose.models.Demo || mongoose.model('Demo', DemoSchema)
