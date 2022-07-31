/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'
import { useStateContext } from '../context/stateContext'
import { setTabIndex } from '../helpers/setTabIndex'

const Hero = ({ product }) => {
	const { showCart } = useStateContext()

	return (
		<section className="hero-container">
			<div className="text-container">
				<h3 className="hero-subheading">{ product.subheading }</h3>
				<h2 className="hero-heading">{ product.heading }</h2>

				<div className="hero-desc-container">
					<p className="hero-desc">{ product.desc }</p>
				</div>
				<Link href={`/product/${product.slug.current}`}>
					<button className="btn btn__accent" tabIndex={setTabIndex(!showCart)}>
						{ product.buttonText }
					</button>
				</Link>
			</div>

			<img 
				src={urlFor(product.image)} 
				alt={product.name}
				className="hero-image"
			/>
		</section>
	)
}

export default Hero