export default {
	name: 'product',
	title: 'Product',
	type: 'document',
	fields: [
		{
			name: 'image',
			title: 'Image',
			type: 'array',
			of: [{ type: 'image' }],
			options: {
				hotspot: true
			}
		},
		{
			name: 'name',
			title: 'Name',
			type: 'string'
		},
		{
			name: 'brand',
			title: 'Brand',
			type: 'string',
			options: {
				list: [
					{ title: 'Canon', value: 'canon' },
					{ title: 'Nikon', value: 'nikon' },
					{ title: 'Sony', value: 'sony' },
					{ title: 'Leica', value: 'leica' }
				],
				layout: 'dropdown'
			}
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 90
			}
		},
		{
			name: 'price',
			title: 'Price',
			type: 'number',
		},
		{
			name: 'details',
			title: 'Details',
			type: 'string'
		}
	]
}