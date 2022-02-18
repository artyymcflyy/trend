// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type TMDBShowResponse = {
    results: Array<TMDBShowResults>
}

type TMDBShowResults = {
    title: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<TMDBShowResponse>) {
    const { query } = req.query
    const showsResponse: TMDBShowResponse = await searchTVShows(query)
    return res.status(200).send(showsResponse)
}

async function searchTVShows(title: string | string[]) {
    const apiKey = process.env.apiKey
    const page = 1
    const language = 'en-US'
    const includeAdult = false
    const tmdbUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&languge=${language}&page=${page}&query=${title}&include_adult=${includeAdult}`
    const res = await fetch(tmdbUrl)
    return res.json()
}

// function searchMovies() {

// }