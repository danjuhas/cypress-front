/// <reference types="cypress" />

import CadastroPage from '../../../pageobject/autenticacao/cadastro.page';
import LoginPage from '../../../pageobject/autenticacao/login.page';

describe('Autenticação/Login', () => {
    it('PAD-2 - Realizar login com e-mail cadastrado na base', () => {
        cy.fazLogin();
    });

    it('PAD-9 - Clicar no link Esqueceu a senha? Clique aqui', () => {
        cy.verificaMobile();
        LoginPage.digitaEmail();
        LoginPage.clicaEsqueceuSenha();
        LoginPage.validaMsgTelaEsqueceuSenha();
        LoginPage.clicaVoltarPaginaLogin();
    });

    it('PAD-12 - Clicar no link Ainda não possui uma conta?', () => {
        LoginPage.clicaLinkCadastro();
        CadastroPage.validaTituloCadastro();
        CadastroPage.clicaBotaoFazerLogin();
    });
});
