import { Restaurant } from "./definitions"

export const getStates = (data: Restaurant[]) => {
	return data.reduce((states: string[], restaurant) => {
		if (!states.includes(restaurant.state)) {
			states.push(restaurant.state)
		}
		return states.sort()
	}, [])
}

export const getGenres = (data: Restaurant[]) => {
	return data.reduce((list: string[], item) => {
		item.genre.split(',').forEach((word) => {
			if (!list.includes(word)) {
				list.push(word)
			}
		})
		return list.sort()
	}, [])
}