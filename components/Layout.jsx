import React from 'react'
import Head from 'next/head'

import Navbar from './Navbar'
import Footer from './Footer'
import Cart from './Cart'

const Layout = ({ children }) => {
	return (
		<div className="layout">
			<Head>
				<title>Camera Shop</title>
			</Head>
			<header>
				<Navbar />
				<Cart />
			</header>
			<main className="main-container">
				{ children }
			</main>
			<Footer />
		</div>
	)
}

export default Layout