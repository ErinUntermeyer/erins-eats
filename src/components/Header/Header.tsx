import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss'

const Header: React.FC = () => {
	return (
		<nav>
			<div className="logo-container">
				<img src='hamburger-logo.png' alt='Hamburger'/>
				<NavLink to='/'><h1>Erin's Eats</h1></NavLink>
			</div>
			<NavLink to='/about'>About</NavLink>
		</nav>
	)
}

export default Header