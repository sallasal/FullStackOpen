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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('ultiinamate')
      cy.get('#password').type('salasana123')
      cy.get('#loginButton').click()
    })

    it('a new blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('New very good blog')
      cy.get('#author').type('Very good author indeed')
      cy.get('#url').type('www.good.blog')
      cy.get('#submitButton').click()

      cy.contains('New very good blog')
      cy.contains('Very good author indeed')
    })

    it('a blog can be liked', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('New very good blog')
      cy.get('#author').type('Very good author indeed')
      cy.get('#url').type('www.good.blog')
      cy.get('#submitButton').click()

      cy.get('#showButton').click()
      cy.get('#likeButton').click()

      cy.contains('Likes: 1')
    })

    it('user can remove blog', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('New very good blog')
      cy.get('#author').type('Very good author indeed')
      cy.get('#url').type('www.good.blog')
      cy.get('#submitButton').click()

      cy.get('#showButton').click()
      cy.get('#delButton').click()

      cy.contains('New very good blog').should('not.exist')
    } )
  })
})