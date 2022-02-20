import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Tv: NextPage = () => {
  const [showDetails, setShowDetails] = useState({name: ''})
  const router = useRouter()
  const { id } = router.query

  const fetchData = async () => {
      const response = await fetch(`/api/search/tv?id=${id}`)
      const details = await response.json()
      console.log(details)
      setShowDetails(details)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <p>Show: {showDetails.name}</p>
}

export default Tv