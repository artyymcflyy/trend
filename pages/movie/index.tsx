import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Movie: NextPage = () => {
  const router = useRouter()
  const { title } = router.query

  // const fetchData = () => {
      
  // }

  // useEffect(() => {

  // }, [])

  return <p>Movie: {title}</p>
}

export default Movie