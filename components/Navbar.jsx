import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { setTabIndex } from '../helpers/setTabIndex'
import { useStateContext } from '../context/stateContext'

import SearchBar from './SearchBar'
import ShoppingBag from './svg/ShoppingBag'
import SearchIcon from './svg/SearchIcon'

const MENU_LINKS = [
	{
		page: 'Home',
		path: '/'
	},
	{
		page: 'Products',
		path: '/brand/all'
	},
	{
		page: 'Search',
		path: '/search'
	}
]

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
	// const [searchQuery, setSearchQuery] = useState('')
	const { setShowCart, showCart, totalQuantity } = useStateContext()
	const router = useRouter()

	useEffect(() => {
		setIsMenuOpen(false)
	}, [router.asPath])

	const tabIndex = { 
		tabIndex: setTabIndex(!showCart) 
	}

	// const handleSearch = async e => {
	// 	e.preventDefault()

	// 	// validate that it's not an empty string or whitespace
	// 	if (searchQuery.trim() === '') return false
	// 	else router.push(`/search?q=${searchQuery}`)
	// }

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
			</div>
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
					>
						<Link href={link.path}>
							<a tabIndex={setTabIndex(isMenuOpen && !showCart)} >
								{ link.page }
							</a>
						</Link>
					</li>
				))}
			</ul>

			<Link href="/">
				<div className="brand">
					<span>Camera</span>Shop
				</div>
			</Link>

			<div className="nav-icons">
				{/* { isSearchBarOpen ? <SearchBar /> : null } */}
				<SearchBar />
				{/* <button 
					className="nav-icons__search" 
					aria-label="Show Search Bar" 
					onClick={() => setIsSearchBarOpen(true)}
					{...tabIndex}
				>
					<SearchIcon />
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

			{/* <div className="menu__search-bar" aria-hidden={!isSearchBarOpen}>
				<form onSubmit={handleSearch}>
					<input 
						type="search" 
						name="search" 
						id="search" 
						placeholder="Search..." 
						onChange={e => setSearchQuery(e.target.value)} 
						value={searchQuery}
						required 
					/>
				</form>
			</div> */}
		</nav>
	)
}

export default Navbar