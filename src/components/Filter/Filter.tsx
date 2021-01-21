import React, { FormEvent, useEffect, useState } from "react"
import Table from "../Table/Table"
import { Restaurant } from "../../helpers/definitions"
import { getRestaurants } from "../../helpers/apiCalls"
import { getStates, getGenres } from "../../helpers/filterHelpers"
import "./Filter.scss"

const Filter = () => {
	const [ allRestaurants, setAllRestaurants ] = useState<Array<Restaurant>>([])
	const [ currentRestaurants, setCurrentRestaurants ] = useState<Array<Restaurant>>()
	const [ conditions, setConditions ] = useState<Array<String>>([])
	const [ searchInput, setSearchInput ] = useState<string>("")
	const [ stateValue, setStateValue ] = useState<string>("")
	const [ genreValue, setGenreValue ] = useState<string>("")
	const [ searchValue, setSearchValue ] = useState<string>("")
	const [ pageNumber, setPageNumber ] = useState<number>(0)
	const [ error, setError ] = useState<string>("")

	useEffect(() => {
		getRestaurants()
			.then(data => {
				setAllRestaurants(data)
				setCurrentRestaurants(data)
			})
			.catch(error => setError(error))
	}, [])

	useEffect(() => {
		setPageNumber(0)
		updateConditions()
	}, [stateValue, genreValue, searchValue])

	useEffect(() => {
		filterRestaurants()
	}, [conditions])

	const getStateFilterOptions = (data: Restaurant[]) => {
		const stateList = getStates(data).map((item, i) => {
			return <option key={i} value={item} data-testid={`${item}-option`}>{item}</option>
		})

		return (
			<select id="state-select" data-testid="state-option" value={stateValue} onChange={(e) => setStateValue(e.target.value) }>
				<option> -- select a State -- </option>
				{stateList}
			</select>
		)
	}

	const getGenreFilterOptions = (data: Restaurant[]) => {
		const genreList = getGenres(data).map((item, i) => {
			return <option key={i} value={item} data-testid={`${item}-option`}>{item}</option>
		})

		return (
			<select id="genre-select" data-testid="genre-option" value={genreValue} onChange={(e) => setGenreValue(e.target.value) }>
				<option> -- select a Genre -- </option>
				{genreList}
			</select>
		)
	}

	const updateConditions = () => {
		if (stateValue && !conditions.includes("state")) {
			setConditions([...conditions, "state"])
		}
		if (genreValue && !conditions.includes("genre")) {
			setConditions([...conditions, "genre"])
		}
		if (searchValue && !conditions.includes("search")) {
			setConditions([...conditions, "search"])
		}
	}

	const checkState = (restaurant: Restaurant) => {
		return stateValue ? restaurant.state === stateValue : true
	}

	const checkGenre = (restaurant: Restaurant) => {
		return genreValue ? restaurant.genre.includes(genreValue) : true
	}

	const checkSearch = (restaurant: Restaurant) => {
		if (searchValue.toLowerCase()) {
			return (
				restaurant.name.toUpperCase()
					.includes(searchValue.toUpperCase()) ||
				restaurant.city.toUpperCase()
					.includes(searchValue.toUpperCase()) ||
				restaurant.genre.toUpperCase()
					.includes(searchValue.toUpperCase())
			)
		} else {
			return true
		}
	}

	const filterRestaurants = () => {
		const allMatches = allRestaurants.reduce((matches: Restaurant[], restaurant) => {
			if (conditions.every(condition => {
				if (condition === "state") {
					return checkState(restaurant)
				}
				if (condition === "genre") {
					return checkGenre(restaurant)
				}
				if (condition === "search") {
					return checkSearch(restaurant)
				}
				return condition
			})) {
				matches.push(restaurant)
			}
			return matches
		}, [])
		setCurrentRestaurants(allMatches)
	}

	const clearFilters = (type: string) => {
		type === "state" ? setStateValue("") : setGenreValue("")
		setConditions(conditions.filter(value => value !== type))
	}

	const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setConditions(conditions.filter(value => value !== "search"))
		setSearchValue(searchInput)
	}

	const handleInputChange = (input: string) => {
		if (input === "") {
			setConditions(conditions.filter(value => value !== "search"))
			setSearchValue("")
		}
	}
	
	return (
		<div className="Filter">
			<h2>Restaurants</h2>
			{!error ?
			<>
				{allRestaurants &&
				<div className="filter-container">
					<div className="filters">
						<label htmlFor="state-select">Filter by State:</label>
						{getStateFilterOptions(allRestaurants)}
						<div className="selected">
							<p>{stateValue}</p>
							{stateValue && 
							<img
								src="x-icon.png"
								onClick={(e) => clearFilters("state")}
								alt="X Icon"
							/>}
						</div>
					</div>
					<div className="filters">
						<label htmlFor="genre-select">Filter by Genre:</label>
						{getGenreFilterOptions(allRestaurants)}
						<div className="selected">
							<p>{genreValue}</p>
							{genreValue && 
							<img
								src="x-icon.png"
								onClick={(e) => clearFilters("genre")}
								alt="X Icon"
							/>}
						</div>
					</div>
					<div className="filters">
						<label htmlFor="search-input">Search by Keyword:</label>
						<form className="search" onSubmit={(e) => onFormSubmit(e)}>
							<input
								className="search-input"
								id="search-input"
								placeholder="Name, City or Genre"
								value={searchInput}
								onChange={(e) => {
									setSearchInput(e.target.value)
									handleInputChange(e.target.value)
								}}
							/>
							<img
								src="search-icon.png"
								alt="Search Icon"
								onClick={(e) => {
									setConditions(conditions.filter(value => value !== "search"))
									setSearchValue(searchInput)
								}}
							/>
						</form>
					</div>
				</div>
				}
				{currentRestaurants &&
					<Table
						restaurantList={currentRestaurants}
						pageNumber={pageNumber}
						setPageNumber={setPageNumber}
					/>
				}
			</> :
			<h3>Uh oh! Something went wrong!</h3>}
		</div>
	)
}

export default Filter