export default {
	name: 'banner',
	title: 'Banner',
	type: 'document',
	fields: [
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: { hotspot: true }
		},
		{
			name: 'heading',
			title: 'Heading',
			type: 'string'
		},
		{
			name: 'subheading',
			title: 'Sub Heading',
			type: 'string'
		},
		{
			name: 'name',
			title: 'Product Name',
			type: 'string'
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
			name: 'desc',
			title: 'Description',
			type: 'string'
		},
		{
			name: 'buttonText',
			title: 'Button Text',
			type: 'string'
		},
		{
			name: 'discount',
			title: 'Discount',
			type: 'string'
		},
		{
			name: 'saleTime',
			title: 'Sale Time',
			type: 'string'
		},
	]
}