import { Restaurant } from "./definitions"

export const getStateFilterOptions = (data: Restaurant[]) => {
	const stateList = data.map((item, i) => {
		return <option key={i} value={item.state}>{item.state}</option>
	})

	return (
		<select>{stateList}</select>
	)
}