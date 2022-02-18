import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";


const Search: NextPage = () => {
    const [queryParam, setQueryParam] = useState()
    const [results, setResults] = useState<any[]>()

    async function fetchData() {
        const fetchResponse = await fetch(`/api/tvshow?query=${queryParam}`)
        const tvShowsResponse = await fetchResponse.json()
        const tvShowsArr = tvShowsResponse.results
        const results: any[] = tvShowsArr.map((result: any) => {
            const title: string = result.name

            return (
                <li key={result.id}>
                    <Link href={`/tvShow?title=${title}`}>{title}</Link>
                </li>
            )
        })
        setResults(results)
    }

    const onChangeHandler = (event: any) => {
        setQueryParam(event.target.value)
    }

    return (
        <div>
            <h1>Hello Search!</h1>
            <div>
                <input type={'text'} onChange={onChangeHandler}/ >
                <button onClick={fetchData}>Submit</button>
            </div>
            <h3>{results}</h3>
        </div>
    )
}

export default Search
