import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Image from "next/image";
import Link from 'next/link';
import dbConnect from '../lib/dbConnect'
import Demo from '../models/Demo'
import Form from '../components/Form'

export default function Index({ demos }) {
  const demoForm = {
    demo_project: [],
  }
  const socket = useRef();
  const [statusMessage, setStatusMessage] = useState();
  
  useEffect(() => {
    socket.current = io();
    socket.current.on("now", (data) => {
      setStatusMessage(data.message);
    });
  }, []);
  return (
    <>
      <main>
        <h1>Home</h1>
        {demos.map((demo) => (
          <div key={demo._id}>
            <div className="card">
              <Image alt="index-image" src={demo.image_url} />
              <div className="main-content">
                <p> {demo.demo_project}</p>
                <div className="btn-container">
                  <Link href="/[id]/edit" as={`/${demo._id}/edit`}>
                    <button className="btn edit">Edit</button>
                  </Link>
                  <Link href="/[id]" as={`/${demo._id}`}>
                    <button className="btn view">View</button>
                  </Link>
                  <br />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div>
            <h1>new project</h1>
            <Form formId="add-demo-form" demoForm={demoForm} />
        </div>
        
      </main>

      <div>
        <h1>{statusMessage}</h1>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  
  await dbConnect()
  
  const result = await Demo.find({})
  const demos = result.map((doc) => {
    const demo = doc.toObject()
    demo._id = demo._id.toString()
    return demo
  })

  return { props: { demos: demos } }
}