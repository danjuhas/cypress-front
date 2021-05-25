/// <reference types="cypress" />

import SenhaPage from '../../pageobject/autenticacao/senha.page';
import MenuPage from '../../pageobject/home/menu.page';

describe('Alterar senha', () => {
    it('PAD-49 - Alterar senha informando a confirmação de senha errada', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaSenhaAtual();
        SenhaPage.digitaNovaSenha();
        SenhaPage.digitaConfirmacaoNovaSenhaErrada();
        SenhaPage.validaMsgErroConfirmacaoSenha();
    });

    it('PAD-139 - Validar que o campo "Senha atual" é limitado a 6 caracteres', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaSenhaAtualMaisCaracter();
        SenhaPage.validarQtdeCaracterSenhaAtual();
    });

    it('PAD-140 - Validar que o campo "Nova Senha" é limitado a 6 caracteres', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaNovaSenhaMaisCaracter();
        SenhaPage.validarQtdeCaracterNovaSenha();
    });

    it('PAD-141 - Validar que o campo "Confirmação de senha" é limitado a 6 caracteres', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaConfirmacaoNovaSenhaMaisCaracter();
        SenhaPage.validarQtdeCaracterConfirmacaoNovaSenha();
    });

    it('PAD-50 - Validar que o campo "Nova senha" não aceita menos que 6 caracteres', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaSenhaAtual();
        SenhaPage.digitaNovaSenhaMenosCaracter();
        SenhaPage.digitaConfirmacaoNovaSenhaMenosCaracter();
        SenhaPage.validaMsgErroSenhaNaoAtendeCriterios();
        SenhaPage.validaBotaoRedefinirSenhaDesabiliado();
    });

    it('PAD-51 - Alterar senha digitando nova senha com valor sequencial', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaSenhaAtual();
        SenhaPage.digitaNovaSenhaSequencial();
        SenhaPage.validaMsgErroSenhaNaoAtendeCriterios();
        SenhaPage.validaBotaoRedefinirSenhaDesabiliado();
    });

    it('PAD-164 - Alterar senha digitando nova senha com valor decrescente', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaSenhaAtual();
        SenhaPage.digitaNovaSenhaDecrescente();
        SenhaPage.validaMsgErroSenhaNaoAtendeCriterios();
        SenhaPage.validaBotaoRedefinirSenhaDesabiliado();
    });

    it('PAD-52 - Alterar senha digitando nova senha com valores iguais', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaSenhaAtual();
        SenhaPage.digitaNovaSenhaValorIgual();
        SenhaPage.validaMsgErroSenhaNaoAtendeCriterios();
        SenhaPage.validaBotaoRedefinirSenhaDesabiliado();
    });

    it('PAD-159 - Alterar senha digitando apenas o campo "Confirmação de senha"', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaConfirmacaoNovaSenha();
        SenhaPage.validaMsgErroConfirmacaoSenha();
        SenhaPage.validaBotaoRedefinirSenhaDesabiliado();
    });

    it('PAD-160 - Alterar senha digitando a senha no campo "Nova Senha" e apagar', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaSenhaAtual();
        SenhaPage.digitaNovaSenhaEapaga();
        SenhaPage.validaBotaoRedefinirSenhaDesabiliado();
    });

    it('PAD-53 - Alterar senha digitando todos os campos e apagar 1 caracter do campo '
    + '"Informe sua senha atual"', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaSenhaAtual();
        SenhaPage.digitaNovaSenha();
        SenhaPage.digitaConfirmacaoNovaSenha();
        SenhaPage.digitaSenhaAtualEapagaUmCaracter();
        SenhaPage.validaBotaoRedefinirSenhaDesabiliado();
    });

    it('PAD-54 - Alterar senha digitando todos os campos e apagar 1 caracter do campo "Nova Senha"', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaSenhaAtual();
        SenhaPage.digitaNovaSenha();
        SenhaPage.digitaConfirmacaoNovaSenha();
        SenhaPage.digitaNovaSenhaEapagaUmCaracter();
        SenhaPage.validaBotaoRedefinirSenhaDesabiliado();
    });

    it('PAD-55 - Alterar senha digitando todos os campos e apagar 1 caracter do campo "Confirmação da Senha"', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaSenhaAtual();
        SenhaPage.digitaNovaSenha();
        SenhaPage.digitaConfirmacaoNovaSenha();
        SenhaPage.digitaConfirmacaoNovaSenhaEapagaUmCaracter();
        SenhaPage.validaBotaoRedefinirSenhaDesabiliado();
    });

    it('PAD-152 - Validar o preenchimento do campo Senha Atual apenas com caracteres numéricos', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaSenhaAtualCaracterEspecial();
        SenhaPage.validaCampoSenhaAtualVazio();
    });

    it('PAD-153 - Validar o preenchimento do campo Nova Senha apenas com caracteres numéricos', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaNovaSenhaCaracterEspecial();
        SenhaPage.validaCampoNovaSenhaVazio();
    });

    it('PAD-154 - Validar o preenchimento do campo Confirmação de Senha apenas com caracteres numéricos', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaConfirmacaoNovaSenhaCaracterEspecial();
        SenhaPage.validaCampoConfirmacaoSenhaVazio();
    });

    it('PAD-56 - Clicar no botão Exibir Senha no campo Senha Atual', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaSenhaAtual();
        SenhaPage.clicaOlhoExibeSenhaAtual();
        SenhaPage.validaCampoSenhaExibido();
    });

    it('PAD-57 - Clicar no botão Exibir Senha no campo Nova Senha', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaNovaSenha();
        SenhaPage.clicaOlhoExibeNovaSenha();
        SenhaPage.validaCampoSenhaExibido();
    });

    it('PAD-58 - Clicar no botão Exibir Senha no campo Confirmar Senha', () => {
        cy.fazLogin();
        MenuPage.clicaMenu();
        MenuPage.clicaAlterarSenha();
        SenhaPage.digitaConfirmacaoNovaSenha();
        SenhaPage.clicaOlhoExibeConfirmaSenha();
        SenhaPage.validaCampoSenhaExibido();
    });
});
