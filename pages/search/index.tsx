import { NextPage } from "next";
import { ChangeEvent, useState } from "react";

const Search: NextPage = () => {
    const [queryParam, setQueryParam] = useState()
    const [results, setResults] = useState<any[]>()

    async function fetchData() {
        const fetchResponse = await fetch(`/api/tvshows?query=${queryParam}`)
        const tvShowsResponse = await fetchResponse.json()
        const tvShowsArr = tvShowsResponse.results
        const results: any[] = tvShowsArr.map((result: any) => <li key={result.id}>{result.name}</li>)
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
