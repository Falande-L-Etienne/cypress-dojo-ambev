/// <reference types="cypress"/>

import user from '../../fixtures/usuario.json'

let token

describe('Funcionalidade: Cadastrar perfil', () => {
    const perfil = {
        empresa: 'KIA ltda',
        site: 'htpps://www.kia.com.br',
        localizacao: 'Rio de Janeiro',
        skill: 'JavaScript, Ruby, Cypress, Java',
        "github": 'https://githu.com/renatosantanaoliveira',
        bioagrafia: 'Olá sou o Renato Santana'
    }

    it('Deve criar o perfil com erro de site errado', () => {
        cy.fixture("usuario").then((data) => {
            cy.login(data.email, data.senha)
        })
        cy.visit('criar-perfil')
        cy.criarPerfil(perfil.empresa, perfil.site, perfil.localizacao, perfil.skill, perfil.github, perfil.bioagrafia)
        cy.get('.MuiFormHelperText-root').should('contain', 'Digite uma url válida')
    });

    it('Devo fazer o login sem sucesso', () => {
        cy.fixture("usuario").then((user) => {
            cy.login(user.email, "senha@5421")
            
            cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas')
        })
    });

    it('[DELETE] - Deve excluir experiência profissional do usuário', () => {
        cy.gerarToken(user.email, user.senha).then((tkn) => {
            token = tkn
        })
        const options = {
            method: 'DELETE',
            url: '/api/profile/experience/{expId}',
            headers :{
                Cookie: token
            },
            body :{
                _id: '63655d36dcaab50015e6021b'
            }
        }

        cy.request(options).then(($response) => {
            expect($response.status).to.equal(200)
        })
    });

    it('[PUT] - Deve incluir formação acadêmica do usuário', () => {
        cy.gerarToken(user.email, user.senha).then((tkn) => {
            token = tkn
        })
        const options = {
            method: 'PUT',
            url: '/api/profile/education',
            headers :{
                Cookie: token
            },
            body: {
                school: 'UnICypress',
                "degree": 'curço Avançado',
                fieldofstudy: 'Dojo Cypress',
                from: '2022-09-09'
            }
        }

        cy.request(options).then(($response) => {
            expect($response.status).to.equal(200)
            expect($response.body.experience[0].title).to.equal('QA Especialist');
            expect($response.body.experience[0].company).to.equal('Via');
        })
    });

});    