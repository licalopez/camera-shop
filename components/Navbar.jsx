import React, { useState } from 'react'
import Link from 'next/link'
import { setTabIndex } from '../helpers/setTabIndex'
import { useStateContext } from '../context/stateContext'

import ShoppingBag from './svg/ShoppingBag'
import Search from './svg/Search'

const MENU_LINKS = [
	{
		page: 'Home',
		path: '/'
	},
	{
		page: 'Products',
		path: '/brand/all'
	}
]

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { setShowCart, showCart, totalQuantity } = useStateContext()

	const tabIndex = { 
		tabIndex: setTabIndex(!showCart) 
	}

	const renderCartCount = () => (
		<span className="nav-icons__cart-count">
			{ totalQuantity }
		</span>
	)

	return (
		<nav className="menu" aria-hidden={showCart}>
			<div className="menu__container">
				<button 
					id="menu-icon"
					className={`menu__icon ${ isMenuOpen ? 'close' : '' }`}
					aria-controls="menu-list"
					aria-label={`${ isMenuOpen ? 'Close' : 'Show' } Menu`}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					{...tabIndex}
				>
					<div className="top-line"></div>
					<div className="middle-line"></div>
					<div className="bottom-line"></div>
				</button>
				<ul 
					id="menu-list" 
					className={`menu__list ${isMenuOpen ? '' : 'hidden'}`}
					aria-labelledby="menu-icon"
					aria-hidden={!isMenuOpen}
					role="dialog"
				>
					{MENU_LINKS.map(link => (
						<li 
							key={link.path} 
							className="menu__list-item" 
							tabIndex={setTabIndex(isMenuOpen && !showCart)}
						>
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

			<div className="nav-icons">
				{/* <button className="nav-icons__search" aria-label="Search" {...tabIndex}>
					<Search />
				</button> */}
				<button 
					className="nav-icons__cart" 
					aria-label="Shopping Cart" 
					onClick={() => setShowCart(true)} {...tabIndex}
				>
					<ShoppingBag />
					{ totalQuantity > 0 ? renderCartCount() : null }
				</button>
			</div>
		</nav>
	)
}

export default Navbar