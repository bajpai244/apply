import { applicationsAirtable, loginsAirtable } from '../../lib/airtable'
import nookies from 'nookies'

export default async function handler(req, res) {
  const cookies = nookies.get({ req })
  try {
    const tokenRecord = await loginsAirtable.find('rec' + cookies.authToken)
    if (!tokenRecord.fields['Path'][0].includes(req.query.id)) {
      res.redirect('/')
      return
    }
    const updateCall = await applicationsAirtable.update('rec' + req.query.id, {
      Submitted: true
    })
    res.status(200).json({ success: true, id: updateCall.id })
  } catch (error) {
    console.log(error)
    res.status(504).json({ success: false, error })
  }
}
