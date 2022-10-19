/* eslint-disable @next/next/no-img-element */
import React from 'react'

import Amex from './svg/Amex'
import Mastercard from './svg/Mastercard'
import PayPal from './svg/PayPal'
import Visa from './svg/Visa'

const Footer = () => {
	return (
		<footer className="footer">
			<div className="wrapper">
				<div className="footer__left">
					<div className="footer__brand">
						<span>Camera</span>Shop
					</div>
					<p className="footer__copyright">&copy; Copyright 2022. All rights reserved.</p>
				</div>

				<div className="footer__right">
					<p>We Accept</p>
					<ul className="footer__payment">
						<li className="footer__payment-item">
							<Visa />
						</li>
						<li className="footer__payment-item">
							<PayPal />
						</li>
						<li className="footer__payment-item">
							<Mastercard />
						</li>
						<li className="footer__payment-item">
							<Amex />
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}

export default Footer