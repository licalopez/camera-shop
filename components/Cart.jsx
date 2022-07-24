import React from 'react'
import { useStateContext } from '../context/stateContext'

const Cart = () => {
	const { cartItems } = useStateContext()
	console.log({ cartItems })

	return (
		<div>Cart</div>
	)
}

export default Cart