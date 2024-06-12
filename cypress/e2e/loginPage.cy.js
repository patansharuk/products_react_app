describe('Login Page', () => {
  it('Successfully Loads', () => {
    cy.login('sharukhan@admin.com', '123456')

    cy.contains('Logout').click()
  })
})