import React from 'react'

const Close = ({ strokeWidth = 3 }) => {
	return (
		<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><g><line x1="17.5" x2="54.5" y1="17.5" y2="54.5" fill="none" strokeMiterlimit="10" strokeWidth={strokeWidth}/><line x1="54.5" x2="17.5" y1="17.5" y2="54.5" fill="none" strokeMiterlimit="10" strokeWidth={strokeWidth}/></g></svg>
	)
}

export default Close