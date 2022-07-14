import React, { useState } from 'react'
import Link from 'next/link'
import { setTabIndex } from '../helpers/setTabIndex'

const MENU_LINKS = [
	{
		page: 'Home',
		path: '/'
	},
	{
		page: 'About',
		path: '/about'
	},
	{
		page: 'Cart',
		path: '/cart'
	}
]

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<nav>
			<div className="menu-container">
				<button 
					id="menu-icon"
					className={`menu-icon ${ isMenuOpen ? 'close' : '' }`}
					aria-controls="menu-list"
					aria-label={`${ isMenuOpen ? 'Close' : 'Show' } Menu`}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<div className="top-line"></div>
					<div className="middle-line"></div>
					<div className="bottom-line"></div>
				</button>
				<ul 
					id="menu-list" 
					className={`menu-list ${isMenuOpen ? '' : 'hidden'}`}
					aria-labelledby="menu-icon"
					aria-hidden={!isMenuOpen}
					role="dialog"
				>
					{MENU_LINKS.map(link => (
						<li key={link.path} className="menu-item" tabIndex={setTabIndex(isMenuOpen)}>
							<Link href={link.path}>
								{ link.page }
							</Link>
						</li>
					))}
				</ul>
			</div>
			<Link href="/">
				<div className="brand">
					<span>Camera</span>Shop
				</div>
			</Link>
		</nav>
	)
}

export default Navbar