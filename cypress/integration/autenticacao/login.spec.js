/// <reference types="cypress" />

import LoginPage from '../../pageobject/autenticacao/login.page';
import MenuPage from '../../pageobject/home/menu.page';
import HomeLogadaPage from '../../pageobject/home/homeLogada.page';

describe('Autenticação/Login', () => {
    it('PAD-3 - Login com e-mail não cadastrado na base', () => {
        cy.verificaMobile();
        LoginPage.digitaEmailNaoCadastrado();
        LoginPage.digitaSenha();
        LoginPage.clicaBotaoLogin();
        LoginPage.validaMsgConfiraCredenciais();
        cy.compareSnapshot('Login não cadastrado', 0.0);
        LoginPage.validaMsgDigiteNovamente();
    });

    it('PAD-4 - Login com e-mail inválido', () => {
        cy.verificaMobile();
        LoginPage.digitaEmailInvalido();
        LoginPage.digitaSenha();
        LoginPage.validaMsgEmailInvalido();
    });

    it('PAD-137 - Validar que o campo "Coloque sua senha" é limitado a 6 caracteres', () => {
        cy.verificaMobile();
        LoginPage.digitaEmail();
        LoginPage.digitaSenhaMaisCaracter();
        LoginPage.validarQtdeCaracterSenha();
    });

    it('PAD-151 - Validar que o campo "Coloque sua senha" aceita apenas caracteres numéricos', () => {
        cy.verificaMobile();
        LoginPage.digitaEmail();
        LoginPage.digitaSenhaCaracterEspecial();
        LoginPage.validaSenhaInvalida();
    });

    it('PAD-5 - Realizar login usando a função "Lembrar meu e-mail" e deslogar', () => {
        cy.verificaMobile();
        LoginPage.digitaEmail();
        LoginPage.ativaLembrarEmail();
        LoginPage.digitaSenha();
        LoginPage.clicaBotaoLogin();
        HomeLogadaPage.validaHomeLogada();
        MenuPage.clicaMenu();
        MenuPage.logout();
        MenuPage.clicaConfirmarSair();
        cy.verificaMobile();
        LoginPage.validaMsgTelaLogin();
    });

    it('PAD-7 - Realizar login informando a senha errada', () => {
        cy.verificaMobile();
        LoginPage.digitaEmailFailure();
        LoginPage.digitaSenhaErrada();
        LoginPage.clicaBotaoLogin();
        LoginPage.validaMsgDigiteNovamente();
    });

    it('PAD-8 - Clicar no botão exibir senha', () => {
        cy.verificaMobile();
        LoginPage.digitaEmail();
        LoginPage.digitaSenha();
        LoginPage.clicaExibirSenha();
        LoginPage.validaSenhaExibida();
        LoginPage.clicaExibirSenha();
        LoginPage.validaSenhaNaoExibida();
    });
});
