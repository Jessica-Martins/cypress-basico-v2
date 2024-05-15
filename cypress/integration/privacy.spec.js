Cypress._.times(5, () => { // função loadash - repete o mesmo teste N vezes
  it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.contains('Não salvamos dados').should('be.visible')
  })
})
