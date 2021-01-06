import React, { useEffect, useState } from 'react'
import Table from '../Table/Table'
import { Restaurant } from '../../helpers/definitions'
import { getRestaurants } from '../../helpers/apiCalls'
import { getStates, getGenres } from '../../helpers/filterHelpers'
import './Home.scss'

const Home = () => {
	const [ restaurants, setRestaurants ] = useState<Array<Restaurant>>()
	const [ stateValue, setStateValue ] = useState<string>('')
	const [ genreValue, setGenreValue ] = useState<string>('')
	
	useEffect(() => {
		getRestaurants()
		.then(data => {
			setRestaurants(data)
		})
	}, [])

	const getStateFilterOptions = (data: Restaurant[]) => {
		const stateList = getStates(data).map((item, i) => {
			return <option key={i} value={item}>{item}</option>
		})

		return (
			<select onChange={(e) => { setStateValue(e.target.value) }}>
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
				{genreList}
			</select>
		)
	}
	
	return (
		<div className="Home">
			<h2>Restaurants</h2>
			{restaurants && <>
				<div className="filter-container">
					<h3>Filter By State:</h3>
					{getStateFilterOptions(restaurants)}
					<h3>Filter By Genre:</h3>
					{getGenreFilterOptions(restaurants)}
				</div>
				<Table restaurantList={restaurants} />
			</> }
		</div>
	)
}

export default Home