import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import banner from './banner'
import brand from './brand'
import product from './product'
import productImage from './productImage'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([ banner, brand, product, productImage ]),
})
