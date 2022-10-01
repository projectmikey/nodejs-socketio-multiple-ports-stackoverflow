import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../components/Form'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditDemo = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: demo, error } = useSWR(id ? `/api/demos/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!demo) return <p>Loading...</p>

  const demoForm = {
    demo_project: demo.demo_project,
  }

  return <Form formId="edit-demo-form" demoForm={demoForm} forNewDemo={false} />
}

export default EditDemo
