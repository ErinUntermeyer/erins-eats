import { Restaurant } from "./definitions"

export const getStateFilterOptions = (data: Restaurant[]) => {
	const stateList = data.map((item, i) => {
		return <option key={i} value={item.state}>{item.state}</option>
	})

	return (
		<select>{stateList}</select>
	)
}

export const getGenreFilterOptions = (data: Restaurant[]) => {
	const genres = data.reduce((list: [], item: any) => {
		item.genre.split(',').forEach((word: never) => {
			if (!list.includes(word)) {
				list.push(word)
			}
		})
		return list
	}, [])

	const genreList = genres.map((item, i) => {
		return <option key={i} value={item}>{item}</option>
	})

	return (
		<select>{genreList}</select>
	)
}