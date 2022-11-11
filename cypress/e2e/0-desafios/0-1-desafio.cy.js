/// <reference types="cypress"/>

const faker = require('faker-br')

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('cadastrar')
    });
    it('Deve validar mensagem de campos obrigatórios', () => {

        cy.get('[data-test="register-submit"]').click()
        cy.get('.MuiFormHelperText-root').should('contain', 'Email é obrigatório')
        cy.get('.MuiFormHelperText-root').should('contain', 'Email é obrigatório')
    });
    
    it('Deve validar mensagem campo nome obrigatório', () => {

        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type('fa3104@gmail.com')
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('senha@54321')
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('senha@54321')

        cy.get('[data-test="register-submit"]').click()
        cy.get('.MuiFormHelperText-root').should('contain', 'Email é obrigatório')
        
    });

    it('Deve validar mensagem campo email obrigatório', () => {

        cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type('Falande Loiseau')
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('senha@54321')
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('senha@54321')

        cy.get('[data-test="register-submit"]').click()
        cy.get('.MuiFormHelperText-root').should('contain', 'Email é obrigatório')
    });

    it('Realize o cadastro do usuário, fazer o logout do site e realizar o login usando o hiperlink "Login"', () => {
        let nome = `Henoc ${faker.name.lastName()}`
        let email = faker.internet.email(nome)

        cy.cadastro(nome, email, 'teste@123', 'teste@123')

        cy.get('[data-test="navbar-logout"]').click() // logout
        
        cy.visit('login')

        cy.login(email, 'teste@123')
        
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });
});