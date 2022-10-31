import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { client } from '../../lib/client'
import { setTabIndex } from '../../helpers/setTabIndex'
import { useStateContext } from '../../context/stateContext'
import ProductCard from '../../components/ProductCard'
import ChevronDown from '../../components/svg/ChevronDown'


const Brand = ({ brandName, brands, products }) => {
	const { showCart } = useStateContext()
	const [showFilters, setShowFilters] = useState(false)

	// ----------------------------- NO RESULTS ----------------------------- //
	const renderNoResults = () => (
		<div className="brand__error">
			<p className="brand__error-msg">
				Sorry, there are no products currently listed under <span>{brandName}</span>.
			</p>
			<Link href="/">
				<button className="btn btn__accent" tabIndex={setTabIndex(!showCart)}>
					Return Home
				</button>
			</Link>
		</div>
	)

	return (
		<section className="brand">
			<Head>
				<title>
					Camera Shop - Browse products for {brandName === 'all' ? 'all brands' : brandName}
				</title>
			</Head>
			<div className="wrapper">
				<div className="brand__container">
					{/* ----------------------------- HEADER ----------------------------- */}
					<div className="brand__header">
						<div className="wrapper__content">
							<h1 className="brand__heading">
								{brandName === 'all' 
									? `Shop All Brands: Featured Products`
									: `Shop ${brandName}: Featured Products`}
							</h1>
							{brandName !== 'all'
								? (
									<div className="brand__header__links">
										<Link href="/brand/all">
											<a tabIndex={setTabIndex(!showCart)}>All Brands</a>
										</Link> <span>/</span> {brandName}
									</div>
								)
								: null}
						</div>
					</div>

					<div className="wrapper__content">
						<div className="brand__products">
							{/* ----------------------------- BRAND FILTERS ----------------------------- */}
							<div className="brand__products__filters">
								<h3 
									className="brand__products__filters-heading"
									onClick={() => setShowFilters(!showFilters)}
								>
									Brands 

									<span 
										aria-label={showFilters ? 'Hide brand filters' : 'Show brand filters'}
										className={`chevron ${showFilters ? 'hide-filters' : ''}`}
									>
										<ChevronDown />
									</span>
								</h3>
								<ul 
									aria-hidden={showFilters ? false : true}
									className={`brand__products__filters-list ${!showFilters ? 'hide' : ''}`}
								>
									{brands.map(brand => (
										<li 
											key={brand._id}
											className={`brand__products__filters-item ${brandName === brand.slug.current ? 'active' : ''}`} 
										>
											<Link href={`/brand/${brand.slug.current}`}>
												<a tabIndex={setTabIndex(!showCart)}>
													{brand.name}
												</a>
											</Link>
										</li>
									))}
								</ul>
							</div>

							{/* ---------------------------- PRODUCTS GRID ---------------------------- */}
							{products.length > 0 
								? <div className="brand__products-grid product-grid">
										{products.map(product => <ProductCard product={product} key={product._id} />)}
									</div>
								: renderNoResults()}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export const getStaticPaths = async () => {
	const brandNamesQuery = `*[_type == 'brand'] {
		slug
	}`

	const brands = await client.fetch(brandNamesQuery)
	let paths = brands?.map(brand => ({
		params: {
			brand: brand?.slug?.current
		}
	}))

	return {
		paths: [...paths, { params: { brand: 'all' } }],
		fallback: false
	}
}

export const getStaticProps = async ({ params: { brand } }) => {
	const brandsQuery = `*[_type == 'brand' && !(_id in path('drafts.**'))]`
	const brands = await client.fetch(brandsQuery)

	const productsQuery = (brand.toLowerCase() === 'all')
		? `*[_type == 'product' && !(_id in path('drafts.**'))]`
		: `*[_type == 'product' && !(_id in path('drafts.**')) && brand._ref in *[_type == 'brand' && slug.current == '${brand.toLowerCase()}']._id]`
	const products = await client.fetch(productsQuery)

	return {
		props: { brandName: brand, brands, products }
	}
}

export default Brand