import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
	projectId: 'nnlcly3r',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2022-07-07',
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN
}) 

export const urlFor = source => imageUrlBuilder(client).image(source)