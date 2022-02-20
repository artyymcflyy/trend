import { NextPage } from "next";
import Link from "next/link";
import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";


const Search: NextPage = () => {
    const [queryParam, setQueryParam] = useState('')
    const [results, setResults] = useState<any[]>()

    async function fetchData() {
        try {
            let test = []
            const searchRequests: Promise<Response>[] = [
                fetch(`/api/search/tv?query=${queryParam}`),
                fetch(`/api/search/movie?query=${queryParam}`)
            ]
            const responses = await Promise.all(searchRequests)
            // TODO: Find a way to use a loop to fulfill the promises dynamically and save them to a single array
            const tvShows = await responses[0].json()
            const movies = await responses[1].json()
            const allResults = [...tvShows.results, ...movies.results]

            const allLinks: any[] = allResults.map((result: any) => {
                const resultType = result.first_air_date ? "tv" : "movie"
                const title: string = resultType === "tv" ? result.name : result.title
                const keyId: string = result.id.toString()
    
                return (
                    <li key={keyId}>
                        <Link href={`/${resultType}?title=${title}`}>{title}</Link>
                    </li>
                )
            })

            setResults(allLinks)
        } catch(error) {
            console.error(error)
        }
    }

    const onQueryTitle: ChangeEventHandler = (event: any) => {
        setQueryParam(event.target.value)
    }

    const OnPressEnter: KeyboardEventHandler = (event) => {
        if (event.key === 'Enter') fetchData()
    }

    return (
        <div>
            <h1>Hello Search!</h1>
            <div>
                <input type={'text'} onChange={onQueryTitle} onKeyPress={OnPressEnter}/ >
            </div>
            <h3>{results}</h3>
        </div>
    )
}

export default Search
