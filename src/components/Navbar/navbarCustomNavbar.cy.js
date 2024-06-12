import React from 'react'
import CustomNavbar from './navbar'
import "bootstrap/dist/css/bootstrap.min.css";

describe('<CustomNavbar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CustomNavbar />)
    cy.viewport(1200,400)
    cy.viewport(400,400)
    cy.contains('Menu').click()
    // cy.get('.btn-close')
    cy.get('.btn-close').click()
    cy.viewport(1200,400)
  })
})