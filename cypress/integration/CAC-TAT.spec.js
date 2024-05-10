/// <reference types="Cypress" />

describe('Central de Atendimento ao cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
  })
  it('verifica o título da aplicação', () => {

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenchendo os campos obrigatórios e enviar o formulário', () => {
    const longText = 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
    cy.get('#firstName').type('Fernanda')

    cy.get('#lastName').type('Moreira')

    cy.get('#email').type('fernanda.moreira@gmail.com')

    cy.get('#open-text-area').type(longText, { delay: 0 })

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Fernanda')

    cy.get('#lastName').type('Moreira')

    cy.get('#email').type('fernanda.moreira+gmail.com')

    cy.get('#open-text-area').type('teste', { delay: 0 })

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Verifica se ao inserir um valor não numerico no campo telefone se ele permanecer vazio', () => {
    cy.get('#phone')
      .type('fernanda', { delay: 80 })
      .should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário', () => {

    cy.get('#firstName').type('Fernanda')

    cy.get('#lastName').type('Moreira')

    cy.get('#email').type('fernanda.moreira@gmail.com')

    cy.get('#phone-checkbox')
      .check()

    cy.get('#open-text-area').type('teste', { delay: 0 })

    cy.contains('button', 'Enviar')
      .click()

    cy.get('.error')
      .should('be.visible')
  })


  it('Preencher e limpa os campos nome, sobrenome,email e telefone', () => {
    cy.get('#firstName')
      .type('Fernanda')
      .should('have.value', 'Fernanda')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Moreira')
      .should('have.value', 'Moreira')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('fernanda.moreira@gmail.com')
      .should('have.value', 'fernanda.moreira@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('123456789', { delay: 0 })
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')

  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar')
      .click()

    cy.get('.error')
      .should('be.visible')
  })

  it('Envia formulario com sucesso utilizando comandos customizados', () => {
    cy.fillMandatoryFieldsAnsSubmit()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(2)
      .should('have.value', 'cursos')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value= "feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')

      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .should('not.have.value',)
      .selectFile('cypress/fixtures/example.json')
      .should(($input) => {  //navega entre as propriedades do input e encontrou o objeto file que contem o nome
        expect($input[0].files[0].name).to.eq('example.json')
      })

  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .should('not.have.value',)
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }) //Simula a ação de arrastar o arquivo para o campo
      .should(($input) => {  //navega entre as propriedades do input e encontrou o objeto file que contem o nome
        expect($input[0].files[0].name).to.eq('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(($input) => {  //navega entre as propriedades do input e encontrou o objeto file que contem o nome
        expect($input[0].files[0].name).to.eq('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a[href="privacy.html')
      .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Não salvamos dados').should('be.visible')
  })
})