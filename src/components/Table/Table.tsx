import React from 'react'
import { Restaurant } from '../../helpers/definitions'
import './Table.scss'

interface TableProps {
	restaurantList: Restaurant[]
}

const Table: React.FC<TableProps> = (props) => {

	const sortedRestaurants = props.restaurantList.sort((a, b) => (
			a.name < b.name ? -1 :
			a.name > b.name ? 1 :
			0
		)
	)

	const createRestaurantTable = () => {
		return sortedRestaurants.map((restaurant: Restaurant, index: number) => {
			const { name, city, state, telephone, genre } = restaurant
			return (
				<tr key={index}>
					<td>{name}</td>
					<td>{city}</td>
					<td>{state}</td>
					<td>{telephone}</td>
					<td>{genre}</td>
				</tr>
			)
		})
	}

	return (
		<div>
			<h2>Restaurants</h2>
			<table className="Table">
				<thead className="TableHead">
					<tr>
						<th>Name</th>
						<th>City</th>
						<th>State</th>
						<th>Phone Number</th>
						<th>Genre(s)</th>
					</tr>
				</thead>
				<tbody>
					{createRestaurantTable()}
				</tbody>
			</table>
		</div>
	)
}

export default Table