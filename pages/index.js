/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { client, urlFor } from '../lib/client'

import Hero from '../components/Hero'
import Product from '../components/Product'

const Home = ({ bannerProduct, brands, products }) => {
  const renderBanner = product => (
    <div className="deals-banner">
      <div className="deals-text">
        <p className="deals-timeframe">
          { product.saleTime }
        </p>
        <h3 className="deals-heading">
          { product.heading }
        </h3>
        <p className="deals-subheading">
          { product.subheading }
        </p>
        <button className="btn btn-dark deals-btn">
          { product.buttonText }
        </button>
      </div>
      <img src={urlFor(product.image)} alt={product.name} className="deals-image" />
    </div>
  )

  return (
    <>
      <div className="wrapper">
        <Hero product={ bannerProduct.length > 0 && bannerProduct[0] } />

        <section className="best-sellers home-section">
          <h2 className="best-sellers-heading home-heading">
            Best Sellers
          </h2>
          <div className="best-sellers-products">
            {products
              .filter((_, i) => i < 7)
              .map(product => <Product key={product._id} product={product} />)}
          </div>
        </section>

        <section className="brands home-section">
          <h2 className="brands-heading home-heading">
            Brand Showcase
          </h2>
          <div className="brands-container">
            {brands?.map(brand => (
              <button className="brand-card" key={brand._id} aria-label={brand.name}>
                <img 
                  src={urlFor(brand.logo)}
                  alt={`${brand.name} logo`} 
                  className="brand-img" 
                />
              </button>
            ))}
          </div>
        </section>

        <section className="deals home-section">
          <h2 className="deals-heading home-heading">
            Featured Deals
          </h2>
          {bannerProduct.length > 1 && bannerProduct[1] && renderBanner(bannerProduct[1])}
        </section>
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const bannerQuery = `*[_type == 'banner']`
  const bannerProduct = await client.fetch(bannerQuery)

  const brandQuery = `*[_type == 'brand']`
  const brands = await client.fetch(brandQuery)

  const productQuery =  `*[_type == 'product']`
  const products = await client.fetch(productQuery)

  return {
    props: { bannerProduct, brands, products }
  }
}

export default Home