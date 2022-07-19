/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const Product = ({ product: { images, name, price, slug } }) => {
	return (
		<Link href={`/product/${slug.current}`}>
			<button className="product-card" aria-labelledby="product-name">
				<div className="product-image-container">
					<img 
						src={urlFor(images && images[0])} 
						className="product-image"
						alt={name} 
					/>
				</div>
				<h4 id="product-name" className="product-name">
					{ name }
				</h4>
				<p className="product-price">
					${ price }
				</p>
			</button>
		</Link>
	)
}

export default Product