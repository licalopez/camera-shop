/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'
import { useStateContext } from '../context/stateContext'
import { setTabIndex } from '../helpers/setTabIndex'
import { numberWithCommas } from '../helpers/numberWithCommas'

const ProductCard = ({ product: { images, name, price, slug }, isTabbable = true }) => {
	const { showCart } = useStateContext()

	return (
		<Link href={`/product/${slug.current}`}>
			<button className="product-card" aria-labelledby="product-name" tabIndex={setTabIndex(isTabbable && !showCart)}>
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
					${ numberWithCommas(price) }
				</p>
			</button>
		</Link>
	)
}

export default ProductCard