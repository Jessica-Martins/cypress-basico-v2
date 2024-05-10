Cypress.Commands.add('fillMandatoryFieldsAnsSubmit', () => {
  cy.get('#firstName').type('Fernanda')

  cy.get('#lastName').type('Moreira')

  cy.get('#email').type('fernanda.moreira@gmail.com')

  cy.get('#open-text-area').type('teste', { delay: 0 })

  cy.contains('button', 'Enviar').click()

})
