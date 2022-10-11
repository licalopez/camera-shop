export default {
	name: 'productImage',
	title: 'Product Image',
	type: 'document',
	fields: [
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true
			}
		},
		{
			name: 'alt',
			title: 'Alt Text',
			type: 'string'
		},
		{
			name: 'isTransparent',
			title: 'Use Transparent Background',
			type: 'boolean',
			description: 'If the image has a transparent background, its thumbnail will be displayed with padding against a solid gray background. Otherwise, the image will be cropped to cover the thumbnail size.',
			initialValue: true
		}
	]
}