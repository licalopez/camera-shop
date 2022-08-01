import React from 'react'
import Link from 'next/link'

import { client } from '../../lib/client'
import { setTabIndex } from '../../helpers/setTabIndex'
import { useStateContext } from '../../context/stateContext'
import ProductCard from '../../components/ProductCard'


const Brand = ({ brandName, brands, products }) => {
	const { showCart } = useStateContext()

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
			<div className="wrapper">
				<div className="brand__container">
					<div className="brand__container">
						{/* ----------------------------- HEADER ----------------------------- */}
						<div className="brand__header">
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

						<div className="brand__products">
							{/* ----------------------------- BRAND FILTERS ----------------------------- */}
							<div className="brand__products__filters">
								<h3 className="brand__products__filters-heading">
									Brands
								</h3>
								<ul className="brand__products__filters-list">
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
	let paths = brands.map(brand => ({
		params: {
			brand: brand.slug.current
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