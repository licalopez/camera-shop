import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useStateContext } from '../context/stateContext'
import { setTabIndex } from '../helpers/setTabIndex'
import SearchIcon from './svg/SearchIcon'

const SearchBar = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const { showCart } = useStateContext()
	const router = useRouter()

	const handleSearch = async e => {
		e.preventDefault()

		// validate that query is not an empty string/whitespace
		if (searchQuery.trim() === '') 
			return false
		else {
			await router.push(`/search?q=${searchQuery}`)
			setSearchQuery('')
		}
	}

	const setDisabled = () => ({
		disabled: showCart,
		tabIndex: setTabIndex(!showCart)
	})

	return (
		<form className="search-bar" onSubmit={handleSearch}>
			<input 
				type="search" 
				name="search" 
				id="search" 
				placeholder="Search..." 
				className="search-bar__input"
				onChange={e => setSearchQuery(e.target.value)} 
				value={searchQuery}
				required 
				{...setDisabled()}
			/>
			<button 
				className="nav-icons__search" 
				aria-label="Search" 
				type="submit"
				{...setDisabled()}
			>
				<SearchIcon />
			</button>
		</form>
	)
}

export default SearchBar