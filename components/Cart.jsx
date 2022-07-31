/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useStateContext } from '../context/stateContext'
import { numberWithCommas } from '../helpers/numberWithCommas'
import loadStripe from '../lib/loadStripe'

import CartItem from './CartItem'
import Close from './svg/Close'

const Cart = () => {
	const { cartItems, setShowCart, showCart, totalPrice } = useStateContext()

	const closeOnEscKey = useCallback(
		event => {
			if (event.keyCode === 27) setShowCart(false)
		}, [setShowCart]
	)

	// prevent body vertical scrolling when cart is open; revert when closed
	useEffect(() => {
		if (showCart)
			document.querySelector('body').style.overflowY = 'hidden'
		return () => document.querySelector('body').style.overflowY = 'scroll'
	}, [showCart])

	// close Cart on Esc key press
	useEffect(() => {
		document.addEventListener('keydown', closeOnEscKey)
		return () => document.removeEventListener('keydown', closeOnEscKey)
	}, [closeOnEscKey])

	const handleCheckout = async e => {
		e.preventDefault()

		const stripe = await loadStripe()	
		const response = await fetch('/api/stripe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(cartItems)
		})

		if (response.statusCode === 500) return
		
		const data = await response.json()
		toast.loading('Redirecting...')
		stripe.redirectToCheckout({ sessionId: data.id })
	}

	return (
		<section className="cart" aria-hidden={!showCart} onClick={() => setShowCart(false)}>
			<div className="cart__container" onClick={e => e.stopPropagation()}>
				<div className="cart__header">
					<h2 className="cart__header-heading">
						Your Cart
					</h2>
					<button className="cart__header-close" onClick={() => setShowCart(false)} aria-label="Close Cart">
						<Close />
					</button>
				</div>

				{cartItems.length > 0 ? (
					<form onSubmit={handleCheckout}>
						<div className="cart__body">
							{cartItems.map(item => <CartItem key={item._id} product={item} />)}
						</div>

						<div className="cart__footer">
							<div className="cart__footer-subtotal">
								<h4 className="subtotal-text">
									Subtotal
								</h4>
								<p className="subtotal-amount">
									${numberWithCommas(totalPrice.toFixed(2))}
								</p>
							</div>
							<p className="cart__footer-disclaimer">
								Shipping and discounts calculated at checkout. All orders are processed in CAD.
							</p>
							<button className="btn btn__dark btn__block" type="submit">
								Pay with Stripe
							</button>
						</div>
					</form>
				) : (
					<div className="cart__body">
						<p>Your cart is currently empty.</p>
					</div>
				)}
			</div>
		</section>
	)
}

export default Cart