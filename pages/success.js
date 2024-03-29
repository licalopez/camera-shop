import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useStateContext } from '../context/stateContext'
import { setTabIndex } from '../helpers/setTabIndex'
import Paid from '../components/svg/Paid';

const Success = () => {
	const { setCartItems, setTotalPrice, setTotalQuantity, showCart } = useStateContext()

	useEffect(() => {
		localStorage.clear()
		setCartItems([])
		setTotalPrice(0)
		setTotalQuantity(0)
	}, [setCartItems, setTotalPrice, setTotalQuantity])

	return (
		<section className="success single-page-container">
			<Head>
				<title>
					Camera Shop - Payment successful
				</title>
			</Head>
			<div className="wrapper">
				<div className="success__container gray-container">
					<Paid />
					<h3 className="success__heading">
						Thank you for shopping!
					</h3>
					<p className="success__text">
						Your payment was processed successfully and your receipt will be emailed to you shortly.
					</p>
					<Link href="/">
						<button className="btn btn__accent" tabIndex={setTabIndex(!showCart)}>
							Back to Home
						</button>
					</Link>
				</div>
			</div>
		</section>
	)
}

export default Success