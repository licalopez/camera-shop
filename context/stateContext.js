import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
	const [cartItems, setCartItems] = useState([])
	const [totalPrice, setTotalPrice] = useState(0)
	const [totalQuantity, setTotalQuantity] = useState(0)
	const [showCart, setShowCart] = useState(false)

	const calculateTotals = updatedCartItems => {
		let newTotalPrice = 0
		let newTotalQuantity = 0

		for (const cartProduct of updatedCartItems) {
			newTotalQuantity += cartProduct.quantity
			newTotalPrice += (cartProduct.quantity * cartProduct.price)
		}

		setTotalPrice(newTotalPrice)
		setTotalQuantity(newTotalQuantity)
	}

	const updateQuantityInCart = (productId, quantity) => {
		const updatedCartItems = cartItems.map(cartProduct => {
			return (cartProduct._id === productId) ? { ...cartProduct, quantity } : cartProduct
		})

		setCartItems(updatedCartItems)
		return updatedCartItems
	}

	const onAddToCart = product => {
		const productInCart = cartItems.find(item => item._id === product._id)
		
		if (productInCart) {
			const incrementedTotal = productInCart.quantity + 1
			
			if (incrementedTotal <= 5) {
				updateQuantityInCart(product._id, incrementedTotal)
			} else {
				toast.error(`Stock exceeded for ${product.name}. Please email us for bulk order placements.`)
				return
			}
		} else {
			setCartItems([...cartItems, {...product, quantity: 1}])
		}

		setTotalQuantity(totalQuantity + 1)
		setTotalPrice(totalPrice + product.price)
		setShowCart(true)
	}

	const onCartUpdate = (productId, updatedQuantity) => {
		const updatedCartItems = updateQuantityInCart(productId, updatedQuantity)
		calculateTotals(updatedCartItems)
	}

	const onRemoveFromCart = productId => {
		const updatedCartItems = cartItems.filter(cartProduct => cartProduct._id !== productId)
		calculateTotals(updatedCartItems)
		setCartItems(updatedCartItems)
	}

	return (
		<Context.Provider value={{
			cartItems,
			setShowCart,
			showCart,
			totalPrice,
			totalQuantity,
			onAddToCart,
			onCartUpdate,
			onRemoveFromCart
		}}>
			{ children }
		</Context.Provider>
	)
}

export const useStateContext = () => useContext(Context)