// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type TMDBMoviesResponse = {
    results: Array<TMDBMoviesResults>
}

type TMDBMoviesResults = {
    id: number,
    title: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<TMDBMoviesResponse>) {
    const { query } = req.query
    const queryToString = String(query)

    let movies: TMDBMoviesResponse | undefined = await searchMovies(queryToString)

    return res.status(200).send(movies)
}

async function searchMovies(title: string): Promise<TMDBMoviesResponse> {
    const apiKey = process.env.apiKey
    const page = 1
    const language = 'en-US'
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&languge=${language}&page=${page}&query=${title}`
    const res = await fetch(tmdbUrl)
    const movies = await res.json()
    return movies
}