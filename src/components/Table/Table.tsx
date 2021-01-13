import React from "react"
import { Restaurant } from "../../helpers/definitions"
import "./Table.scss"

interface TableProps {
	restaurantList: Restaurant[]
	pageNumber: number
	setPageNumber: Function
}

const Table: React.FC<TableProps> = ({ restaurantList, pageNumber, setPageNumber }) => {
	const sortedRestaurants = restaurantList.sort((a, b) => (
			a.name < b.name ? -1 :
			a.name > b.name ? 1 :
			0
		)
	)

	const get10Entries = () => {
		return sortedRestaurants.slice(0 + pageNumber * 10, 10 + pageNumber * 10)
	}

	const createRestaurantTable = () => {
		return get10Entries().map((restaurant: Restaurant, index: number) => {
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

	const getNumberOfPages = () => {
		const numOfPages = parseInt((restaurantList.length / 10).toFixed())
		return numOfPages
	}

	return (
		<div className="table-container">
			<div className="button-container">
				{pageNumber > 0 ?
					<div className="page-icons">
						<img
							alt="Previous Arrow Icon"
							className="arrow-icon"
							src="./prev-icon.png"
							onClick={(e) => setPageNumber(pageNumber - 1)}
						/>
					</div> :
					<div className="page-icons"></div>
				}
				{restaurantList.length > 0 &&
					<h3>Page {pageNumber + 1} of {getNumberOfPages() === 0 ? 1 : getNumberOfPages()}</h3>}
				{pageNumber < getNumberOfPages() - 1 ?
					<div className="page-icons">
						<img
							alt="Next Arrow Icon"
							className="arrow-icon"
							src="./next-icon.png"
							onClick={(e) => setPageNumber(pageNumber + 1)}
						/>
					</div> :
					<div className="page-icons"></div>
				}
			</div>
			{restaurantList.length > 0 ?
			<div>
				<table className="table">
					<thead className="table-head">
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
			:
			<h3>There are no restaurants that match your query, please try again.</h3>}
		</div>
	)
}

export default Table