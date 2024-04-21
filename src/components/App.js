import React, { useState, useEffect, useMemo } from 'react'

const App = () => {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const fetchData = useMemo(() => {
		const fetchDataFromAPI = async () => {
			setIsLoading(true)
			try {
				const response = await fetch(
					'https://jsonplaceholder.typicode.com/posts'
				)
				const data = await response.json()
				setData(data)
			} catch (error) {
				setError(error)
			} finally {
				setIsLoading(false)
			}
		}

		return fetchDataFromAPI
	}, []) 
	useEffect(() => {
		fetchData()
	}, []) 

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	return (
		<div>
			<h2>Fetched Data</h2>
			<ul>
				{data.map((item) => (
					<li key={item.id}>{item.title}</li>
				))}
			</ul>
		</div>
	)
}

export default App
