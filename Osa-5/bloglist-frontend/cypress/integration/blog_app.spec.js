describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tiina Testi',
      username: 'ultiinamate',
      password: 'salasana123'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('Username:')
    cy.contains('Password:')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ultiinamate')
      cy.get('#password').type('salasana123')
      cy.get('#loginButton').click()

      cy.contains('Tiina Testi is logged in.')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#loginButton').click()

      cy.get('.error').should('contain', 'Wrong credentials').and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})