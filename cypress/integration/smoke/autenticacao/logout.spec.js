/// <reference types="cypress" />

import LoginPage from '../../../pageobject/autenticacao/login.page';
import MenuPage from '../../../pageobject/home/menu.page';
import HomeLogadaPage from '../../../pageobject/home/homeLogada.page';

describe('Autenticação/Logout', () => {
    it('PAD-148 - Validar mensagem de logout', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.logout();
        MenuPage.validaMsgJaVai();
        MenuPage.validaMsgConfirmacaoLogout();
        MenuPage.clicaConfirmarSair();
    });

    it('PAD-149 - Clicar no botão "NÃO, VOU FICAR"', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.logout();
        MenuPage.clicaFicar();
        HomeLogadaPage.validaHomeLogada();
        MenuPage.clicaMenu();
        MenuPage.logout();
        MenuPage.clicaConfirmarSair();
    });

    it('PAD-150 - Clicar no botão "SIM, QUERO SAIR"', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.logout();
        MenuPage.clicaConfirmarSair();
        cy.verificaMobile();
        LoginPage.validaMsgTelaLogin();
    });
});
