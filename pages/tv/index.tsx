import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Tv: NextPage = () => {
  const router = useRouter()
  const { title } = router.query

  // const fetchData = () => {
      
  // }

  // useEffect(() => {

  // }, [])

  return <p>Show: {title}</p>
}

export default Tv