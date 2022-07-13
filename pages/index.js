import React from 'react'
import { client } from '../lib/client'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Product from '../components/Product'
import Footer from '../components/Footer'

const Home = ({ bannerProduct, products }) => {
  return (
    <>
      <Navbar />
      <div className="banner-wrapper">
        <Hero product={ bannerProduct.length > 0 && bannerProduct[0] } />
      </div>

      <div className="wrapper">
        <section className="best-sellers-container">
          <h2>Best Sellers</h2>
          <p>Shop our top cameras and lenses</p>
          {products.map(product => <Product key={product.slug} product={product} />)}
          
          <div className="best-sellers-products">
            { products.map(product => (
              <p key={product.slug.current} className="product-name">{ product.name }</p>
            )) }
          </div>
        </section>

        <section className="brands-container">
          <h2>Brand Showcase</h2>
        </section>

        <section>
          <h2>Featured Deals</h2>
          <p>Save on [...] from our trusted sellers</p>
        </section>
      </div>

      <Footer />
    </>
  )
}

export const getServerSideProps = async () => {
  const productQuery =  `*[_type == 'product']`
  const products = await client.fetch(productQuery)

  const bannerQuery = `*[_type == 'banner']`
  const bannerProduct = await client.fetch(bannerQuery)

  return {
    props: { bannerProduct, products }
  }
}

export default Home