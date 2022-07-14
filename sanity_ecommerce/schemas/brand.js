export default {
	name: 'brand',
	title: 'Brand',
	type: 'document',
	fields: [
		{
			name: 'name',
			title: 'Brand Name',
			type: 'string'
		},
		{
			name: 'logo',
			title: 'Logo',
			type: 'image'
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 50
			}
		}
	]
}