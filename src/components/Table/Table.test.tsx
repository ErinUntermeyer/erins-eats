import React from "react"
import Table from "./Table"
import { MemoryRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react"

describe("Table", () => {

	it("Should display app name and logo", () => {
		render(<MemoryRouter><Table /></MemoryRouter>)

	})

})