import React, { useEffect, useState } from 'react'
import Table from '../Table/Table'
import { Restaurant } from '../../helpers/definitions'
import { getRestaurants } from '../../helpers/apiCalls'
import { getStates, getGenres } from '../../helpers/filterHelpers'
import './Home.scss'

const Home = () => {
	const [ allRestaurants, setAllRestaurants ] = useState<Array<Restaurant>>([])
	const [ currentRestaurants, setCurrentRestaurants ] = useState<Array<Restaurant>>()
	const [ conditions, setConditions ] = useState<Array<String>>([])
	const [ stateValue, setStateValue ] = useState<string>('')
	const [ genreValue, setGenreValue ] = useState<string>('')
	const [ searchValue, setSearchValue ] = useState<string>('')
	
	useEffect(() => {
		getRestaurants()
		.then(data => {
			setAllRestaurants(data)
			setCurrentRestaurants(data)
		})
	}, [])

	useEffect(() => {
		if (searchValue === '') {
			setConditions(conditions.filter(value => value !== 'search'))
		}
		updateConditions()
	}, [stateValue, genreValue, searchValue])

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

	const updateConditions = () => {
		if (stateValue && !conditions.includes('state')) {
			setConditions([...conditions, 'state'])
		}
		if (genreValue && !conditions.includes('genre')) {
			setConditions([...conditions, 'genre'])
		}
		if (searchValue && !conditions.includes('search')) {
			setConditions([...conditions, 'search'])
		}
	}

	const checkState = (restaurant: Restaurant) => {
		if (stateValue) {
			return restaurant.state === stateValue
		} else {
			return true
		}
	}

	const checkGenre = (restaurant: Restaurant) => {
		if (genreValue) {
			return restaurant.genre.includes(genreValue)
		} else {
			return true
		}
	}

	const checkSearch = (restaurant: Restaurant) => {
		if (searchValue) {
			return (restaurant.name.includes(searchValue) || restaurant.city.includes(searchValue) || restaurant.genre.includes(searchValue))
		} else {
			return true
		}
	}

	const clearFilters = (type: string) => {
		type === 'state' ? setStateValue('') : setGenreValue('')
		setConditions(conditions.filter(value => value !== type))
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
							onClick={(e) => clearFilters('state')}
							alt='X Icon'
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
							onClick={(e) => clearFilters('genre')}
							alt='X Icon'
						/>}
					</div>
				</div>
				<div className="filters">
					<h3>Search By Keyword:</h3>
					<div className="search">
						<input
							className="search-input"
							placeholder='Name, City or Genre'
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
						/>
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