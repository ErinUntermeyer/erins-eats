import React from "react"
import Table from "./Table"
import { Restaurant } from "../../helpers/definitions"
import { MemoryRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react"

describe("Table", () => {
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

	it("Should display column headers", () => {
		render(
			<MemoryRouter>
				<Table
					restaurantList={mockedRestaurants}
					pageNumber={0}
					setPageNumber={jest.fn()}
				/>
			</MemoryRouter>)
		const name = screen.getByText(/name/i)
		const city = screen.getByText(/city/i)
		const state = screen.getByText(/state/i)
		const phone = screen.getByText(/phone number/i)
		const genre = screen.getByText(/genre/i)
		expect(name).toBeInTheDocument()
		expect(city).toBeInTheDocument()
		expect(state).toBeInTheDocument()
		expect(phone).toBeInTheDocument()
		expect(genre).toBeInTheDocument()
	})

	it("Should display page numbers", () => {
		render(
			<MemoryRouter>
				<Table
					restaurantList={mockedRestaurants}
					pageNumber={0}
					setPageNumber={jest.fn()}
				/>
			</MemoryRouter>)
		const pageNumber = screen.getByText(/page 1 of 1/i)
		expect(pageNumber).toBeInTheDocument()
	})

})