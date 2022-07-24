import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
	const [cartItems, setCartItems] = useState([])
	const [showCart, setShowCart] = useState(false)
	const [totalPrice, setTotalPrice] = useState()
	const [totalQuantity, setTotalQuantity] = useState(0)

	const updateQuantityInCart = (product, quantity) => {
		const updatedCartItems = cartItems.map(cartProduct => {
			return (cartProduct._id === product._id) ? { ...cartProduct, quantity } : cartProduct
		})

		setCartItems(updatedCartItems)
	}

	const onAddToCart = product => {
		const productInCart = cartItems.find(item => item._id === product._id)
		
		if (productInCart) {
			const incrementedTotal = productInCart.quantity + 1
			
			if (incrementedTotal <= 10) {
				updateQuantityInCart(product, incrementedTotal)
			} else {
				toast.error(`Stock exceeded for ${product.name}. Please email us for bulk order placements.`)
				return
			}
		} else {
			product.quantity = 1
			setCartItems([...cartItems, {...product}])
		}

		setTotalQuantity(totalQuantity + 1)
	}

	return (
		<Context.Provider value={{
			cartItems,
			showCart,
			totalPrice,
			totalQuantity,
			onAddToCart
		}}>
			{ children }
		</Context.Provider>
	)
}

export const useStateContext = () => useContext(Context)