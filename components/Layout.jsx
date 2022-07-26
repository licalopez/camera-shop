import React from 'react'
import Head from 'next/head'

import Navbar from './Navbar'
import Footer from './Footer'
import Cart from './Cart'

import { useStateContext } from '../context/stateContext'

const Layout = ({ children }) => {
	const { showCart } = useStateContext()

	return (
		<div className="layout">
			<Head>
				<title>Camera Shop</title>
			</Head>
			<header>
				<Navbar />
			</header>
			{ showCart && <Cart /> }
			<main className="main-container" aria-hidden={showCart}>
				{ children }
			</main>
			<Footer />
		</div>
	)
}

export default Layout