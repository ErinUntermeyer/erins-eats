import React from "react"
import Header from "./Header"
import { MemoryRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react"

describe("Header", () => {

	it("Should display app name and logo", () => {
		render(<MemoryRouter><Header /></MemoryRouter>)
		const title = screen.getByRole("heading", { name: /erin\'s eats/i })
		const logo = screen.getByAltText(/hamburger/i)
		expect(title).toBeInTheDocument
		expect(logo).toBeInTheDocument
	})

})