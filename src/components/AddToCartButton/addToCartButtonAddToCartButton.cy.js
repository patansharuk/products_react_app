import React from 'react'
import AddToCartButton from './addToCartButton'

describe('<AddToCartButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddToCartButton product={{}} onAddProduct={()=>{}}/>)
  })
})