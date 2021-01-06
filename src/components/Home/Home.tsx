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
		filterRestaurants()
	}, [stateValue, genreValue])

	const getStateFilterOptions = (data: Restaurant[]) => {
		const stateList = getStates(data).map((item, i) => {
			return <option key={i} value={item}>{item}</option>
		})

		return (
			<select value={stateValue} onChange={(e) => setStateValue(e.target.value) }>
				<option selected> -- select a State -- </option>
				{stateList}
			</select>
		)
	}

	const getGenreFilterOptions = (data: Restaurant[]) => {
		const genreList = getGenres(data).map((item, i) => {
			return <option key={i} value={item}>{item}</option>
		})

		return (
			<select value={genreValue} onChange={(e) => setGenreValue(e.target.value) }>
				<option selected> -- select a Genre -- </option>
				{genreList}
			</select>
		)
	}

	const filterRestaurants = () => {
		if (stateValue && genreValue) {
			setCurrentRestaurants(allRestaurants?.filter(restaurant => restaurant.state === stateValue && restaurant.genre.includes(genreValue))
			)
		}
		if (stateValue && !genreValue) {
			setCurrentRestaurants(allRestaurants?.filter(restaurant => restaurant.state === stateValue))
		}
		if (genreValue && !stateValue) {
			setCurrentRestaurants(allRestaurants?.filter(restaurant => restaurant.genre.includes(genreValue)))
		}
		if (!stateValue && !genreValue) {
			setCurrentRestaurants(allRestaurants)
		}
	}

	const clearInput = (type: string) => {
		type === 'state' ? setStateValue('') : setGenreValue('')
	}
	
	return (
		<div className="Home">
			<h2>Restaurants</h2>
			{allRestaurants &&
			<div className="filter-container">
				<div className="filters">
					<h3>Filter By State:</h3>
					{getStateFilterOptions(allRestaurants)}
					<div className="selected">
						<p>{stateValue}</p>
						{stateValue && 
						<img
							src='x-icon.png'
							onClick={(e) => clearInput('state')}
						/>}
					</div>
				</div>
				<div className="filters">
					<h3>Filter By Genre:</h3>
					{getGenreFilterOptions(allRestaurants)}
					<div className="selected">
						<p>{genreValue}</p>
						{genreValue && 
						<img
							src='x-icon.png'
							onClick={(e) => clearInput('genre')}
						/>}
					</div>
				</div>
			</div>
			}
			{currentRestaurants &&
				<Table restaurantList={currentRestaurants} />
			}
		</div>
	)
}

export default Home