/// <reference types="cypress"/>

const faker = require('faker-br')

describe('Funcionalidade: Cadastro', () => {  // Separar os contexto dos meus testes

    beforeEach(() => {
        cy.visit('cadastrar')
    });
    it('Cadastro com sucesso', () => { // cenário de teste ou caso de teste ou história de teste
        //let nome = `Renato ${faker.name.lastName()}`
        let nome = faker.name.findName()
        let email = faker.internet.email(nome)

        cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(nome)
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('senha@54321')
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('senha@54321')

        cy.get('[data-test="register-submit"]').click()
        cy.get('.large').should('contain', 'Dashboard')
        cy.contains(nome).should('exist')
    });

    it('Deve validar mensagem quando cadastrar com email repetido', () => {
        let email = faker.internet.email()
        cy.cadastro('Fedeline', email, 'teste@123', 'teste@123')

        cy.get('[data-test="navbar-logout"]').click() // logout
        
        cy.visit('cadastrar')

        cy.cadastro('Fedeline', email, 'teste@123', 'teste@123')
        cy.get('[data-test="alert"]').should('contain', 'Usuário já registrado')
    });

    
});