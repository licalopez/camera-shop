/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'
import { setTabIndex } from '../helpers/setTabIndex'

const Product = ({ product: { images, name, price, slug }, isTabbable = true }) => {
	return (
		<Link href={`/product/${slug.current}`}>
			<button className="product-card" aria-labelledby="product-name" tabIndex={setTabIndex(isTabbable)}>
				<div className="product-card__image-container">
					<img 
						src={urlFor(images && images[0])} 
						className="product-card__image"
						alt={name} 
					/>
				</div>
				<h4 id="product-name" className="product-card__name">
					{ name }
				</h4>
				<p className="product-card__price">
					${ price }
				</p>
			</button>
		</Link>
	)
}

export default Product