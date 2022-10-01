import dbConnect from '../../../lib/dbConnect'
import Demo from '../../../models/Demo'
import fs from 'fs'
import shell from "shelljs";

export default async function handler(req, res) {
  const {
    method,
    body,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const demos = await Demo.find({})
        res.status(200).json({ success: true, data: demos })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const timestamp = Date.now();
        const initialjson = '[]'
        // stage 1
        if (shell.exec('./script-1.sh').code !== 0) {
          shell.echo('Sorry script-1 failed to execute');
          shell.exit(1);
        };
        const obj = JSON.parse(initialjson);
        obj.push("stage 1 success", + timestamp);
        const finalJSON = JSON.stringify(obj);
        fs.writeFileSync('../database/status-message.json', finalJSON);
        // stage 2
        if (shell.exec('./script-2.sh').code !== 0) {
          shell.echo('Sorry script-2 failed to execute');
          shell.exit(1);
        };
        const initialjson2 = '[]'
        const obj2 = JSON.parse(initialjson2);
        obj2.push("stage 2 success", + timestamp);
        const finalJSON2 = JSON.stringify(obj2);
        fs.writeFileSync('../database/status-message.json', finalJSON2);
        const demo = await Demo.create(
          req.body
        )
        res.status(201).json({ success: true, data: demo })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
