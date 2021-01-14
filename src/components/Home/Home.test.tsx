import React from "react"
import Home from "./Home"
import { MemoryRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react"

describe("Home", () => {

	it("Should display filter dropdowns", () => {
		render(<MemoryRouter><Home /></MemoryRouter>)
		const stateLabel = screen.getByLabelText(/filter by state:/i)
		const genreLabel = screen.getByLabelText(/filter by genre:/i)
		expect(stateLabel).toBeInTheDocument()
		expect(genreLabel).toBeInTheDocument()
	})

	it("Should display search input", () => {
		render(<MemoryRouter><Home /></MemoryRouter>)
		const searchInput = screen.getByPlaceholderText(/name, city or genre/i)
		expect(searchInput).toBeInTheDocument()
	})

})