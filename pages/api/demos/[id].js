import dbConnect from '../../../lib/dbConnect'
import Demo from '../../../models/Demo'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const demo = await Demo.findById(id)
        if (!demo) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: demo })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const demo = await Demo.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!demo) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: demo })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedDemo = await Demo.deleteOne({ _id: id })
        if (!deletedDemo) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
