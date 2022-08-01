/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { client, urlFor } from '../../lib/client'
import { useStateContext } from '../../context/stateContext'
import { setTabIndex } from '../../helpers/setTabIndex'

import ProductCard from '../../components/ProductCard'
import Arrow from '../../components/svg/Arrow'


const Product = ({ product, similarProducts }) => {
	const { images, name, price, description } = product
	const [isDescExpanded, setIsDescExpanded] = useState(false)
	const [mainImgIndex, setMainImgIndex] = useState(0)
	const [suggestionsIndex, setSuggestionsIndex] = useState(0)  // 0 or 1
	const { onAddToCart, setShowCart, showCart } = useStateContext()

	const handleBuyNow = () => {
		onAddToCart(product)
		setShowCart(true)
	}

	const tabIndex = {
		tabIndex: setTabIndex(!showCart)
	}

	const renderDesc = () => {
		let totalCharacterCount = 0
		let paragraphsArray = []

		// find cutoff for 'Read More...'
		for (const paragraph of description) {
			const currentParagraph = paragraph.children[0].text
			totalCharacterCount += currentParagraph.length

			if (currentParagraph.length <= 930 && totalCharacterCount <= 930) {
				paragraphsArray.push(currentParagraph)
			}
		}

		return isDescExpanded 
			? (description.map(paragraph => (
					<p key={paragraph._key}>
						{ paragraph.children[0].text }
					</p>
				)))
			: (paragraphsArray.map((text, i) => <p key={i}>{text}</p>))
	}

	return (
		<div className="product wrapper">
			{/* --------------------------------- PRODUCT --------------------------------- */}
			<div className="product__container">
				<div className="product__images">
					<div className="product__main-image">
						<div className="product__main-image-container">
							<img src={urlFor(images[mainImgIndex])} alt={name} />
						</div>
					</div>
					<div className="product__thumbnails">
						{images
							.filter((_, i) => i < 4)
							.map((image, i) => (
								<div 
									key={i}
									className="product__thumbnail-container"
									onClick={() => setMainImgIndex(i)}
								>
									<img src={urlFor(image)} alt={name} className="product__thumbnail" />
								</div>
						))}
					</div>
				</div>

				<div className="product__text">
					<h1 className="product__name">
						{ name }
					</h1>
					<p className="product__price">
						$ { price }
					</p>
					<div className="product__details">
						{ renderDesc() }
						<button  
							className="read-more" 
							onClick={() => setIsDescExpanded(!isDescExpanded)}
							{...tabIndex}
						>
							{ isDescExpanded ? 'Show Less' : 'Read More...' }
						</button>
					</div>

					<div className="product__buttons">
						<button 
							className="btn btn__dark btn__block" 
							onClick={() => {
								onAddToCart(product)
								toast.success(`${name} added to cart.`)
							}}
							{...tabIndex}
						>
							Add to Cart
						</button>
						<button 
							className="btn btn__accent btn__block" 
							onClick={handleBuyNow} 
							{...tabIndex}
						>
							Buy Now
						</button>
					</div>
				</div>
			</div>

			{/* --------------------------------- SUGGESTIONS --------------------------------- */}
			<div className="suggestions">
				<div className="suggestions__header">
					<h2 className="suggestions__heading">
						You Might Also Like
					</h2>
					<div className="suggestions__arrows">
						<button 
							className="suggestions__arrow arrow-left" 
							onClick={() => setSuggestionsIndex(0)}
							{...tabIndex}
						>
							<Arrow />
						</button>
						<button 
							className="suggestions__arrow arrow-right" 
							onClick={() => setSuggestionsIndex(1)}
							{...tabIndex}
						>
							<Arrow />
						</button>
					</div>
				</div>

				<div className="suggestions__container">
					<div className={`suggestions__scrollable-container ${ suggestionsIndex === 1 ? 'shift' : ''}`}>
						{ similarProducts.map((product, i) => (
							<ProductCard 
								key={product._id} 
								product={product} 
								isTabbable={ (suggestionsIndex === 0 && i <= 4) || 
									           (suggestionsIndex === 1 && i > 4) ? true : false 
													 }
							/>
						)) }
					</div>
				</div>
			</div>
		</div>
	)
}

export const getStaticPaths = async () => {
	const productsSlugQuery = `*[_type == 'product'] {
		slug {
			current
		}
	}`

	const products = await client.fetch(productsSlugQuery)
	const paths = products.map(product => ({
		params: {
			slug: product.slug.current
		}
	}))

	return {
		paths,
		fallback: false
	}
}

export const getStaticProps = async ({ params: { slug } }) => {
	const productQuery = `*[_type == 'product' && slug.current == '${slug}'][0]`
	const product = await client.fetch(productQuery) 

	const productsQuery = `*[_type == 'product' && slug.current != '${slug}'][0...10]`  // don't fetch current product
	const similarProducts = await client.fetch(productsQuery)

	return {
		props: { product, similarProducts }
	}
}

export default Product