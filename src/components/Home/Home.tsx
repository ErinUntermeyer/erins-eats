import React, { useEffect, useState } from 'react'
import Table from '../Table/Table'
import { Restaurant } from '../../helpers/definitions'
import { getRestaurants } from '../../helpers/apiCalls'
import { getGenreFilterOptions, getStateFilterOptions } from '../../helpers/filterHelpers'
import './Home.scss'

const Home = () => {
	const [ restaurants, setRestaurants ] = useState<Array<Restaurant>>()
	
	useEffect(() => {
		getRestaurants()
		.then(data => {
			setRestaurants(data)
		})
	}, [])
	
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