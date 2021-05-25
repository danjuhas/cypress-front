/// <reference types="cypress" />

import SenhaPage from '../../../pageobject/autenticacao/senha.page';
import MenuPage from '../../../pageobject/home/menu.page';

describe('Alterar senha', () => {
    it('PAD-48 - Alterar senha usando senha atual errada', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaSenhaAtualErrada();
        SenhaPage.digitaNovaSenha();
        SenhaPage.digitaConfirmacaoNovaSenha();
        SenhaPage.clicaBotaoRedefinirSenha();
        SenhaPage.validaMsgErroAlteraSenha();
    });
});
