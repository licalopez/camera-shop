export default {
	name: 'product',
	title: 'Product',
	type: 'document',
	fields: [
		{
			name: 'images',
			title: 'Images',
			type: 'array',
			of: [
				{ 
					type: 'image',
					options: {
						hotspot: true
					}
				}
			],
		},
		{
			name: 'productImage',
			title: 'Product Images',
			type: 'array',
			of: [
				{ type: 'productImage' }
			]
		},
		{
			name: 'name',
			title: 'Name',
			type: 'string'
		},
		{
			name: 'brand',
			title: 'Brand',
			type: 'reference',
			to: [
				{ type: 'brand' }
			]
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
			name: 'description',
			title: 'Description',
			type: 'array',
			of: [{
				type: 'block'
			}],
			styles: []
		}
	]
}