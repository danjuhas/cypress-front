// elementos

import Base from '../base/base.page';

const senhaAtual = '#oldPassword';
const newPwd = '#newPassword';
const newPwdConfirm = '#newPasswordConfirm';
// const botaoRedefinirSenha = '.sc-chbbiW'
const botaoRedefinirSenha = '//*[@id="container-master"]/div/div/div[2]/div/div/div[2]/button';
const olhoExibeSenha = '#container-master > div > div > div > div > div > div > div > div > div > div';
const olhoExibeNovaSenha = '#container-master > div > div > div > div > div > div > div > div:nth-child(2) > div';
const olhoExibeConfirmSenha = '#container-master > div > div > div > div > div > div > div > div:nth-child(4) > div';
const autenticacao = `autenticacao${Cypress.env('environment')}`;

export default class SenhaPage extends Base {
    static digitaSenhaAtual() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(senhaAtual, dataLoader.passwordSuccess);
        });
    }

    static digitaSenhaAtualErrada() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(senhaAtual, dataLoader.OldPasswordFailure);
        });
    }

    static digitaSenhaAtualEapagaUmCaracter() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(senhaAtual, dataLoader.oldPasswordAndDelete);
        });
    }

    static digitaSenhaAtualCaracterEspecial() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(senhaAtual, dataLoader.passwordEspecialCaracter);
        });
    }

    static digitaNovaSenha() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(newPwd, dataLoader.passwordSuccess);
        });
    }

    static digitaNovaSenhaCaracterEspecial() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(newPwd, dataLoader.passwordEspecialCaracter);
        });
    }

    static digitaNovaSenhaMenosCaracter() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(newPwd, dataLoader.passwordLessCaracter);
        });
    }

    static digitaNovaSenhaSequencial() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(newPwd, dataLoader.sequencialPassword);
        });
    }

    static digitaNovaSenhaDecrescente() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(newPwd, dataLoader.descendingPassword);
        });
    }

    static digitaNovaSenhaValorIgual() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(newPwd, dataLoader.equalValuePassword);
        });
    }

    static digitaNovaSenhaEapaga() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(newPwd, dataLoader.newPasswordAndDelete);
        });
    }

    static digitaNovaSenhaEapagaUmCaracter() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(newPwd, dataLoader.oldPasswordAndDelete);
        });
    }

    static digitaConfirmacaoNovaSenha() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(newPwdConfirm, `${dataLoader.passwordSuccess}`, true);
        });
    }

    static digitaConfirmacaoNovaSenhaCaracterEspecial() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(newPwdConfirm, `${dataLoader.passwordEspecialCaracter}`, true);
        });
    }

    static digitaConfirmacaoNovaSenhaMaisCaracter() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(newPwdConfirm, `${dataLoader.passwordMoreCaracter}`, true);
        });
    }

    static digitaConfirmacaoNovaSenhaMenosCaracter() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(newPwdConfirm, `${dataLoader.passwordLessCaracter}`, true);
        });
    }

    static digitaConfirmacaoNovaSenhaErrada() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(newPwdConfirm, `${dataLoader.ConfirmPasswordFailure}`, true);
        });
    }

    static digitaConfirmacaoNovaSenhaEapagaUmCaracter() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(newPwdConfirm, `${dataLoader.oldPasswordAndDelete}`, true);
        });
    }

    static digitaSenhaAtualMaisCaracter() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(senhaAtual, dataLoader.passwordMoreCaracter);
        });
    }

    static digitaNovaSenhaMaisCaracter() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(newPwd, dataLoader.passwordMoreCaracter);
        });
    }

    static clicaBotaoRedefinirSenha() {
        super.buscaElementoXpath(botaoRedefinirSenha).click();
    }

    static clicaOlhoExibeSenhaAtual() {
        super.buscaElemento(olhoExibeSenha, 0).click();
    }

    static clicaOlhoExibeNovaSenha() {
        super.buscaElemento(olhoExibeNovaSenha).click();
    }

    static clicaOlhoExibeConfirmaSenha() {
        super.buscaElemento(olhoExibeConfirmSenha, 0).click();
    }

    static validaMsgErroAlteraSenha() {
        cy.contains('A senha atual inserida está errada');
    }

    static validaMsgUltimasSenhas() {
        cy.contains('Por favor, crie uma nova senha diferente das suas 5 últimas.');
    }

    static validaMsgErroConfirmacaoSenha() {
        cy.contains('As senhas não estão iguais. Tente novamente.');
    }

    static validarQtdeCaracterSenhaAtual() {
        super.buscaElemento(senhaAtual).should('have.value', '123456');
    }

    static validarQtdeCaracterNovaSenha() {
        super.buscaElemento(newPwd).should('have.value', '123456');
    }

    static validarQtdeCaracterConfirmacaoNovaSenha() {
        super.buscaElemento(newPwdConfirm).should('have.value', '123456');
    }

    static validaMsgErroSenhaNaoAtendeCriterios() {
        cy.contains('A senha precisa seguir os critérios exigidos abaixo.');
    }

    static validaBotaoRedefinirSenhaDesabiliado() {
        super.buscaElementoXpath(botaoRedefinirSenha).should('be.disabled');
    }

    static validaCampoSenhaAtualVazio() {
        super.buscaElemento(senhaAtual).should('have.value', '');
    }

    static validaCampoNovaSenhaVazio() {
        super.buscaElemento(senhaAtual).should('have.value', '');
    }

    static validaCampoConfirmacaoSenhaVazio() {
        super.buscaElemento(senhaAtual).should('have.value', '');
    }

    static validaCampoSenhaExibido() {
        super.buscaElemento('[type=text]').should('exist');
    }
}
