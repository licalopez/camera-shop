/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { client, urlFor } from '../lib/client'
import Link from 'next/link'
import { useStateContext } from '../context/stateContext'
import { setTabIndex } from '../helpers/setTabIndex'

import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'

const Home = ({ bannerProduct, brands, products }) => {
  const { showCart } = useStateContext()

  const renderBanner = product => (
    <div className="deals__banner">
      <div className="deals__text">
        <p className="deals__timeframe">
          { product.saleTime }
        </p>
        <h3 className="deals__heading">
          { product.heading }
        </h3>
        <p className="deals__subheading">
          { product.subheading }
        </p>
        <Link href={`/product/${product.slug.current}`}>
          <button className="btn btn__dark deals__btn" tabIndex={setTabIndex(!showCart)}>
            { product.buttonText }
          </button>
        </Link>
      </div>
      <img src={urlFor(product.image)} alt={product.name} className="deals__image" />
    </div>
  )

  return (
    <div className="wrapper">
      <Hero product={ bannerProduct.length > 0 && bannerProduct[0] } />

      <section className="best-sellers home-section">
        <h2 className="home-heading">
          Best Sellers
        </h2>
        <div className="best-sellers__products">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section className="brands home-section">
        <h2 className="home-heading">
          Brand Showcase
        </h2>
        <div className="brands__container">
          {brands?.map(brand => (
            <button className="brands__card" key={brand._id} aria-label={brand.name} tabIndex={setTabIndex(!showCart)}>
              <img 
                src={urlFor(brand.logo)}
                alt={`${brand.name} logo`} 
                className="brands__img" 
              />
            </button>
          ))}
        </div>
      </section>

      <section className="deals home-section">
        <h2 className="home-heading">
          Featured Deals
        </h2>
        {bannerProduct.length > 1 && bannerProduct[1] && renderBanner(bannerProduct[1])}
      </section>
    </div>
  )
}

export const getServerSideProps = async () => {
  const bannerQuery = `*[_type == 'banner']`
  const bannerProduct = await client.fetch(bannerQuery)

  const brandQuery = `*[_type == 'brand']`
  const brands = await client.fetch(brandQuery)

  // exclude drafts from being fetched:
  const productQuery =  `*[_type == 'product' && !(_id in path('drafts.**'))][0...8]`
  const products = await client.fetch(productQuery)

  return {
    props: { bannerProduct, brands, products }
  }
}

export default Home