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

      <div className="wrapper">
        <Hero product={ bannerProduct.length > 0 && bannerProduct[0] } />

        <section className="best-sellers-container home-section">
          <h2 className="best-sellers-heading home-heading">
            Best Sellers
          </h2>
          <div className="best-sellers-products">
            {products
              .filter((_, i) => i < 7)
              .map(product => <Product key={product._id} product={product} />)}
          </div>
        </section>

        <section className="brands-container home-section">
          <h2 className="brands-heading home-heading">
            Brand Showcase
          </h2>
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