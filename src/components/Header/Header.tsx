import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss'

const Header: React.FC = () => {
	return (
		<nav>
			<NavLink to='/'><h1>Erin's Eats</h1></NavLink>
			<NavLink to='/about'>About</NavLink>
		</nav>
	)
}

export default Header