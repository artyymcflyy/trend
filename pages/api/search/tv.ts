// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type TMDBTvResponse = {
    results: Array<TMDBTvResults>
}

type TMDBTvResults = {
    id: number,
    title: string
}

// type TMDBTvDetailsResults = {
//     id: number,
//     title: string
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse<TMDBTvResponse>) {
    const { query, id } = req.query
    const idToString = id !== undefined ? String(id) : undefined
    const queryToString = query !== undefined ? String(query) : undefined

    let tvShows: TMDBTvResponse | undefined
    let tvShowDetails: any | undefined

    if (queryToString) {
        tvShows = await searchForTVShows(queryToString)
    }
    
    if (idToString) {
        tvShowDetails = await searchTvShowDetails(idToString)
    }

    return res.status(200).send(tvShows || tvShowDetails)
}

async function searchForTVShows(title: string): Promise<TMDBTvResponse> {
    const apiKey = process.env.apiKey
    const page = 1
    const language = 'en-US'
    const tmdbUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&languge=${language}&page=${page}&query=${title}`
    const res = await fetch(tmdbUrl)
    const tvShows = await res.json()
    return tvShows
}

async function searchTvShowDetails(id: string) {
    const apiKey = process.env.apiKey
    const language = 'en-US'
    const tmdbUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=${language}`
    const res = await fetch(tmdbUrl)
    const details = await res.json()
    return details
}