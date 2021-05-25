import Base from '../base/base.page';
// elementos
const menu = '#link-menu';
const linkMeusInvestimentos = '#link-wallet';
const botaoSair = '#link-logout';
const botaoAlteraSenha = '#link-change-password';
const btnHome = '#link-home';
const btnFechar = '#menu-container > div > div > svg';
const btnHistorico = '#link-extract';
const btnPerfil = '#link-profile';
const btnConta = '#link-bank-account';
const btnTrocarSenha = '#link-change-password';
const btnTermosdeUso = '#link-user-terms';
const linkAjuda = 'li:nth-child(10) > a';
const textoLogado = '#text-hello';
const catalogo = 'a[href*="products"]';
const home = '//*[@id="container-master"]/div[2]/div/div[1]/div[1]/div[1]/div/a/img';

export default class MenuPage extends Base {
    static fazLogout() {
        cy.visit('');
        super.clicaElemento(menu, true);
        super.clicaElemento(botaoSair);
        cy.contains('SIM, QUERO SAIR').click();
    }

    static clicaMenu() {
        super.clicaElemento(menu);
    }

    static clicaMeusInvestimentos() {
        cy.initServer('POST', '**CarteiraPrincipalControllerLOUT**');
        super.clicaElemento(linkMeusInvestimentos);
        cy.validateRequest(200);
    }

    static clicaHome() {
        cy.initServer('POST', '**HomeLogadaControllerLOUT**');

        super.buscaElementoXpath(home).click({ force: true });

        cy.validateRequest(200);
    }

    static clicaCatalogo() {
        super.clicaElemento(catalogo);
    }

    static logout() {
        super.clicaElemento(botaoSair);
    }

    static clicaConfirmarSair() {
        cy.contains('SIM, QUERO SAIR').click();
    }

    static clicaFicar() {
        cy.contains('NÃO, VOU FICAR').click();
    }

    static clicaAlterarSenha() {
        super.clicaElemento(botaoAlteraSenha);
    }

    static clicaInicio() {
        super.clicaElemento(btnHome);
    }

    static clicaFechar() {
        super.clicaElemento(btnFechar);
    }

    static clicaHistorico() {
        super.clicaElemento(btnHistorico);
    }

    static clicaPerfil() {
        super.clicaElemento(btnPerfil);
    }

    static clicaChat() {
        super.buscaElementoContem('Chat').click();
    }

    static validaSair() {
        super.buscaElementoContem('SIM, QUERO SAIR');
    }

    static clicaConta() {
        super.clicaElemento(btnConta);
    }

    static clicaTrocarSenha() {
        super.clicaElemento(btnTrocarSenha);
    }

    static clicaTermosdeUso() {
        super.clicaElemento(btnTermosdeUso);
    }

    static validaAjuda() {
        super.buscaElemento(linkAjuda).should('have.attr', 'href').and('include', 'somospihelp');
    }

    static validaMsgJaVai() {
        cy.contains('Já vai?');
    }

    static validaMsgConfirmacaoLogout() {
        cy.contains('Certeza que quer sair do app da Pi?');
    }

    static validaUrlMenu(url) {
        cy.url().then((urlatual) => {
            super.validaTexto(urlatual, url);
        });
    }

    static validaTermosdeUso() {
        cy.contains('Regras e Parâmetros');
    }

    static validaIconeFechar() {
        super.buscaElemento(textoLogado).should('be.visible');
    }
}
