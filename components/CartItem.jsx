/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { urlFor } from '../lib/client'
import { useStateContext } from '../context/stateContext'

import Close from './svg/Close'
import ChevronDown from './svg/ChevronDown'

const CartItem = ({ product }) => {
	const { _id, images, name, quantity, slug, price } = product
	const { onCartUpdate, onRemoveFromCart } = useStateContext()

	const loadQuantityValues = maxValue => {
		const options = []
		for (let i = 1; i <= maxValue; i++) {
			options.push({ value: i })
		}

		return options
	}

	return (
		<div className="cart__item">
			<div className="cart__item-thumbnail">
				<img src={urlFor(images[0])} alt={name} />
			</div>

			<div className="cart__item-details">
				<p className="cart__item-details__name">
					{ name }
				</p>
				<div className="cart__item-details__price">
					<div className="cart__item-details__price__quantity-container">
						<label htmlFor={slug}>
							Quantity
						</label>
						<div className="quantity-form-container">
							<select 
								name={`${_id}-quantity`} 
								id={slug} 
								value={quantity}
								onChange={e => onCartUpdate(_id, +e.target.value)} 
							>
								{loadQuantityValues(5).map(option => (
									<option key={`option-${option.value}`} {...option}>
										{option.value}
									</option>
								))}
							</select>
							<ChevronDown />
						</div>
					</div>
					<p className="cart__item-details__total">
						${quantity * price}
					</p>
					<button 
						className="cart__item-details__remove" 
						aria-label="Remove item from cart" 
						onClick={() => onRemoveFromCart(_id)}
					>
						<Close strokeWidth={7} />
					</button>
				</div>
			</div>
		</div>
	)
}

export default CartItem