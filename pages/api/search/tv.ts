// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type TMDBTvShowsResponse = {
    results: Array<TMDBShowsResults>
}

type TMDBShowsResults = {
    id: number,
    title: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<TMDBTvShowsResponse>) {
    const { query } = req.query
    const queryToString = String(query)

    let tvShows: TMDBTvShowsResponse | undefined = await searchForTVShows(queryToString)

    return res.status(200).send(tvShows)
}

async function searchForTVShows(title: string): Promise<TMDBTvShowsResponse> {
    const apiKey = process.env.apiKey
    const page = 1
    const language = 'en-US'
    const tmdbUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&languge=${language}&page=${page}&query=${title}`
    const res = await fetch(tmdbUrl)
    const tvShows = await res.json()
    return tvShows
}

// async function searchTvShowDetails(id: number) {

// }