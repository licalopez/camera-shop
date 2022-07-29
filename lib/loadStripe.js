import { loadStripe as getStripe } from "@stripe/stripe-js"

let stripePromise

const loadStripe = () => {
	if (!stripePromise)
		stripePromise = getStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

	return stripePromise
}

export default loadStripe