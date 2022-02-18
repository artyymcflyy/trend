import { NextPage } from 'next'
import { useRouter } from 'next/router'

const TvShow: NextPage = () => {
  const router = useRouter()
  const { title } = router.query

  return <p>Show: {title}</p>
}

export default TvShow