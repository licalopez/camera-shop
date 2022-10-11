import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { client } from '../lib/client'
import { useStateContext } from '../context/stateContext'
import { setTabIndex } from '../helpers/setTabIndex';

import SearchBar from '../components/SearchBar'
import ProductCard from '../components/ProductCard'


const Search = ({ products, query }) => {
	const { showCart } = useStateContext()

	const renderNoResultsFound = () => (
		<div className="search__no-results">
			<h2 className="search__no-results__heading">
				No results found
			</h2>
			<p className="search__no-results__paragraph">
				We could not find any results based on your search. Check out other items in our store.
			</p>
			<Link href="/brand/all">
				<button tabIndex={setTabIndex(!showCart)} className="btn btn__accent">
					View all products
				</button>
			</Link>
		</div>
	)

	const renderSearchResults = () => (
		<>
			<Head>
				<title>
					Camera Shop - Search results for {query}
				</title>
			</Head>
			<Link href="/brand/all">
				<a tabIndex={setTabIndex(!showCart)} className="search__results-link">
					View all products
				</a>
			</Link>
			<div className="product-grid">
				{products.map(product => <ProductCard key={product._id} product={product} />)}
			</div>
		</>
	)

	return (
		<section className="search">
			<div className="wrapper">
				<header className="search__header">
					<h1 className="search__heading">
						{query ? `Search Results for "${query}"` : 'Search Our Catalogue'}
					</h1>
				</header>

				<SearchBar />

				<div className="wrapper__content">
					<div className="search__results-container">
						{ query && products?.length > 0 ? renderSearchResults()
						: query && products?.length === 0 ? renderNoResultsFound()
						: <p className="search__no-query">or view all our available products <Link href="/brand/all">here</Link>.</p>}
					</div>
				</div>
			</div>
		</section>
	)
}

export const getServerSideProps = async ({ query }) => {
	const querySansQuotes = query?.q?.replace(/'/g, '').replace(/"/g, '')
	const searchQuery = `*[_type == 'product' && !(_id in path('drafts.**')) && (name match '${querySansQuotes}' || description[].children[].text match '${querySansQuotes}')]`
	const products = query.q ? await client.fetch(searchQuery) : null

	return {
		props: {
			products,
			query: query.q || null
		}
	}
}

export default Search