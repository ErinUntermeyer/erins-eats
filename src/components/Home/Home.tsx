import React, { useEffect, useState } from 'react'
import Table from '../Table/Table'
import { Restaurant } from '../../helpers/definitions'
import { getRestaurants } from '../../helpers/apiCalls'
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
			{restaurants &&
				<Table restaurantList={restaurants} />
			}
		</div>
	)
}

export default Home