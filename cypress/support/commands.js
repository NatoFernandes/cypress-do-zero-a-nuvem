// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('messageSuccessVisible', () => {
    cy.get('.success')
        .should('be.visible')
})

Cypress.Commands.add('messageErrorVisible', () => {
    cy.get('.error')
        .should('be.visible')
})


Cypress.Commands.add('messageSuccess', () => {
    cy.get('.success')
        .invoke('text')
        .then((text) => {
            expect(text.trim()).to.equal('Mensagem enviada com sucesso.');
        });
})

Cypress.Commands.add('messageError', () => {
    cy.get('.error')
        .invoke('text')
        .then((text) => {
            expect(text.trim()).to.equal('Valide os campos obrigatórios!');
        });
})


Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Romário',
    lastName: 'Flamengo',
    email: 'romario.flamengo@flamengo.com.br',
    text: 'Olá, peixe'
}) => {
    cy.get('#firstName')
        .type(data.firstName)
    cy.get('#lastName')
        .type(data.lastName)
    cy.get('#email')
        .type(data.email)
    cy.get('#open-text-area')
        .type(data.text)
    cy.get('div .button').click()
})

