import React, { useEffect, useState } from 'react'
import Table from '../Table/Table'
import { Restaurant } from '../../helpers/definitions'
import { getRestaurants } from '../../helpers/apiCalls'
import { getStates, getGenres } from '../../helpers/filterHelpers'
import './Home.scss'

const Home = () => {
	const [ allRestaurants, setAllRestaurants ] = useState<Array<Restaurant>>()
	const [ currentRestaurants, setCurrentRestaurants ] = useState<Array<Restaurant>>()
	const [ stateValue, setStateValue ] = useState<string>('')
	const [ genreValue, setGenreValue ] = useState<string>('')
	
	useEffect(() => {
		getRestaurants()
		.then(data => {
			setAllRestaurants(data)
			setCurrentRestaurants(data)
		})
	}, [])

	useEffect(() => {
		filterByState(stateValue)
	}, [stateValue])

	useEffect(() => {
		filterByGenre(genreValue)
	}, [genreValue])

	const getStateFilterOptions = (data: Restaurant[]) => {
		const stateList = getStates(data).map((item, i) => {
			return <option key={i} value={item}>{item}</option>
		})


		return (
			<select onChange={(e) => { setStateValue(e.target.value) }}>
				<option hidden disabled selected> -- select a State -- </option>
				{stateList}
			</select>
		)
	}

	const getGenreFilterOptions = (data: Restaurant[]) => {
		const genreList = getGenres(data).map((item, i) => {
			return <option key={i} value={item}>{item}</option>
		})

		return (
			<select onChange={(e) => { setGenreValue(e.target.value) }}>
				<option hidden disabled selected> -- select a Genre -- </option>
				{genreList}
			</select>
		)
	}

	const filterByState = (state: string) => {
		setCurrentRestaurants(allRestaurants?.filter(restaurant => restaurant.state === state))
	}

	const filterByGenre = (genre: string) => {
		setCurrentRestaurants(allRestaurants?.filter(restaurant => restaurant.genre.includes(genre)))
	}
	
	return (
		<div className="Home">
			<h2>Restaurants</h2>
			{allRestaurants &&
				<div className="filter-container">
					<h3>Filter By State:</h3>
					{getStateFilterOptions(allRestaurants)}
					<h3>Filter By Genre:</h3>
					{getGenreFilterOptions(allRestaurants)}
				</div>
			}
			{currentRestaurants &&
				<Table restaurantList={currentRestaurants} />
			}
		</div>
	)
}

export default Home