const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
		try {
			const params = {
				submit_type: 'pay',
				payment_method_types: ['card'],
				billing_address_collection: 'auto',
				shipping_options: [
					{ shipping_rate: 'shr_1LQErkHRSB2XO9TwadzcOqoA' },
					{ shipping_rate: 'shr_1LQEz4HRSB2XO9TwJEeUVKI6' }
				],
				line_items: req.body.map(cartItem => {
					const img = cartItem.images[0].asset._ref
					const newImage = img.replace('image-', `https://cdn.sanity.io/images/${process.env.SANITY_PROJECT_ID}/production/`).replace('-webp', '.webp').replace('-png', '.png')
					
					return {
						price_data: {
							currency: 'cad',
							product_data: {
								name: cartItem.name,
								images: [newImage]
							},
							unit_amount: cartItem.price * 100,
						},
						adjustable_quantity: {
							enabled: false,
							// minimum: 0,
							// maximum: 5
						},
						quantity: cartItem.quantity
					}
				}),
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      }

      const session = await stripe.checkout.sessions.create(params);
			res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message); 
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}