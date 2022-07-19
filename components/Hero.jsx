/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const Hero = ({ product }) => {
	return (
		<section className="hero-container">
			<div className="text-container">
				<h3 className="hero-subheading">{ product.subheading }</h3>
				<h2 className="hero-heading">{ product.heading }</h2>

				<div className="hero-desc-container">
					<p className="hero-desc">{ product.desc }</p>
				</div>
				<Link href={`/product/${product._id}`}>
					<button className="btn btn-accent">
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