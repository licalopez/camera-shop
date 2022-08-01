import React from 'react'
import Link from 'next/link'
import { setTabIndex } from '../helpers/setTabIndex'
import { useStateContext } from '../context/stateContext'

const NotFound = () => {
	const { showCart } = useStateContext()

	return (
		<section className="not-found single-page-container">
			<div className="wrapper">
				<div className="not-found__container gray-container">
					<h1 className="not-found__heading">
						404
					</h1>
					<h2 className="not-found__subheading">
						The page you are looking for could not be found.
					</h2>
					<Link href="/">
						<button className="btn btn__accent" tabIndex={setTabIndex(!showCart)}>
							Continue Shopping
						</button>
					</Link>
				</div>
			</div>
		</section>
	)
}

export default NotFound