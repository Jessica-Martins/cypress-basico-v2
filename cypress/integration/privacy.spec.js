it.only('testa a página da política de privacidade de forma independente', () => {
  cy.visit('./src/privacy.html')
  cy.contains('Não salvamos dados').should('be.visible')
})