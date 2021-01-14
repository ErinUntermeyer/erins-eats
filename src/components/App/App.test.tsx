import React from "react"
import App from "./App"
import { Restaurant } from "../../helpers/definitions"
import { MemoryRouter } from "react-router-dom"
import { render } from "@testing-library/react"
import { mocked } from "ts-jest/utils"
import { getRestaurants } from "../../helpers/apiCalls"
jest.mock("../../helpers/apiCalls")

describe("App", () => {
	let mockedRestaurants: Restaurant[]

	beforeEach(() => {
		mockedRestaurants = [
			{
				id: "1",
				name: "Erin's Pub",
				city: "Denver",
				state: "CO",
				telephone: "(555) 555-5555",
				genre: "American,Cafe,Steak"
			},
			{
				id: "2",
				name: "Howard and Finn's Eatery",
				city: "Boulder",
				state: "CO",
				telephone: "(111) 111-1111",
				genre: "Traditional,Cafe,Contemporary"
			},
		]
	})

	it("Should render a list of restaurants upon load", async () => {
		mocked(getRestaurants).mockImplementation(() => Promise.resolve(mockedRestaurants))
		const { findByText } = render(<MemoryRouter><App /></MemoryRouter>)
		const name1 = await findByText(/erin\'s pub/i)
		const city1 = await findByText(/denver/i)
		const name2 = await findByText(/howard and finn\'s eatery/i)
		const city2 = await findByText(/boulder/i)
		expect(name1).toBeInTheDocument()
		expect(city1).toBeInTheDocument()
		expect(name2).toBeInTheDocument()
		expect(city2).toBeInTheDocument()
	})

})
