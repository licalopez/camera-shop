/* eslint-disable @next/next/no-img-element */
import React from 'react'

import Amex from './svg/Amex'
import Mastercard from './svg/Mastercard'
import PayPal from './svg/PayPal'
import Visa from './svg/Visa'

const Footer = () => {
	return (
		<footer>
			<div className="wrapper">
				<div className="footer-left">
					<div className="footer-brand">
						<span>Camera</span>Shop
					</div>
					<p className="footer-copyright">&copy; Copyright 2022</p>
				</div>

				{/* <div className="footer-center">
					<ul className="footer-social-icons">
					</ul>
				</div> */}

				<div className="footer-right">
					<p>We Accept</p>
					<ul className="footer-payment">
						<li className="footer-payment-item">
							<Visa />
						</li>
						<li className="footer-payment-item">
							<PayPal />
						</li>
						<li className="footer-payment-item">
							<Mastercard />
						</li>
						<li className="footer-payment-item">
							<Amex />
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}

export default Footer