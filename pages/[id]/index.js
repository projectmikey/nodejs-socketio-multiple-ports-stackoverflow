import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Demo from '../../models/Demo'

/* Allows you to view demo card info and delete demo card*/
const DemoPage = ({ demo }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const demoID = router.query.id

    try {
      await fetch(`/api/demos/${demoID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the demo.')
    }
  }

  return (
    <div key={demo._id}>
      <div className="card">
        <h5 className="demo-name">{demo.name}</h5>
        <div className="main-content">
          <p className="demo-name">{demo.demo_project}</p>
          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${demo._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const demo = await Demo.findById(params.id).lean()
  demo._id = demo._id.toString()

  return { props: { demo } }
}

export default DemoPage
