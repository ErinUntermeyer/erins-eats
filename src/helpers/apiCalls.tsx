let requestHeaders: any = { "Authorization": process.env.REACT_APP_API_KEY }

export const getRestaurants = (): Promise<any> => {
	return fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
		headers: requestHeaders
	})
		.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				throw response
			}
		})
}