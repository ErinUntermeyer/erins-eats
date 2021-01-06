import { Restaurant } from "./definitions"

const getStates = (data: Restaurant[]) => {
	return data.reduce((states: string[], restaurant) => {
		if (!states.includes(restaurant.state)) {
			states.push(restaurant.state)
		}
		return states.sort()
	}, [])
}

export const getStateFilterOptions = (data: Restaurant[]) => {
	const stateList = getStates(data).map((item, i) => {
		return <option key={i} value={item}>{item}</option>
	})

	return (
		<select>{stateList}</select>
	)
}

const getGenres = (data: Restaurant[]) => {
	return data.reduce((list: string[], item) => {
		item.genre.split(',').forEach((word) => {
			if (!list.includes(word)) {
				list.push(word)
			}
		})
		return list.sort()
	}, [])
}

export const getGenreFilterOptions = (data: Restaurant[]) => {
	const genreList = getGenres(data).map((item, i) => {
		return <option key={i} value={item}>{item}</option>
	})

	return (
		<select>{genreList}</select>
	)
}