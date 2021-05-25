import Base from '../base/base.page';

// elementos
const helloNickName = '#text-hello';
const olhoExibirSaldo = '#text-hide';
const textIntituicaoHome = '.user-inst';
const iconeSaldo = '#text-totalValue';
const saldoEmConta = '#accountBalance';
const saldoEmTransicao = '#accountInTransection';
const cardComecandoComPouco = '#link-startingWithLittle';
const cardNovosPorAqui = '#link-newsOnesHere';
const cardmaisBuscados = '#link-moreSearching';
const botaoInvestir = '#btn-invest';
const botaoRetirar = '#btn-withdraw';
const valorAplicadoCardCarrossel = 'li > div > div > div:nth-child(4) > span:nth-child(2)';
const botaoCancelarCarrossel = 'li:nth-child(1) > div > div > div > a';
const botaoSimCancelar = 'section > div > button:nth-child(1)';
const msgCancelarModal = 'section > h3';
// const botaoTrazer = '#btn-bring';
const botaoMeusInvestimentos = '#btn-my-investments';
const botaoSaibaMais = '#btSaibaMaisWidgetSaldo';
const botaoTrocarPontosPi = '#btTrocarPontos';
const botaoMinimizarCardPontosPi = 'img.down';
const btnTrazer = '#btn-bring';
const btnComoGanho = '#btGanharPontos';

export default class HomeLogadaPage extends Base {
    static validaExibeSaldo() {
        super.textoElemento(iconeSaldo).as('textoElemento');
        cy.get('@textoElemento').then((valid) => {
            if (valid.includes('R$')) {
                super.clicaElemento(olhoExibirSaldo);
            }
        });
    }

    static clicaExibeSaldo() {
        super.clicaElemento(olhoExibirSaldo);
    }

    static consultaSaldo() {
        super.buscaElemento(saldoEmConta).invoke('text').as('primeiroSaldo');
    }

    static consultaSegundoSaldo() {
        super.buscaElemento(saldoEmConta).invoke('text').as('segundoSaldo');
    }

    static consultaSaldoEmTransicao() {
        super.buscaElemento(saldoEmTransicao).invoke('text').as('primeiroSaldoEmTransicao');
    }

    static consultaSegundoSaldoEmTransicao() {
        super.buscaElemento(saldoEmTransicao).invoke('text').as('segundoSaldoEmTransicao');
    }

    static consultaSaldoCarrossel() {
        super.buscaElemento(valorAplicadoCardCarrossel).last().invoke('text').as('valorCarrossel');
    }

    static validaValorAplicadoCarrossel(valorCarrossel, valorAplicado) {
        let val1 = valorCarrossel.replace('R$ ', '');
        val1 = val1.replace(/[.?]/g, '');
        val1 = val1.replace(',', '.');
        const valor1 = parseFloat(val1);
        expect(valorAplicado).to.eq(valor1);
    }

    static clicaCancelarAplicacaoNoCarrossel() {
        super.clicaElemento(botaoCancelarCarrossel);
    }

    static clicaSimCancelarAplicacaoNoCarrossel() {
        super.clicaElemento(botaoSimCancelar);
        super.buscaElemento(msgCancelarModal).should('have.not.be.visible');
    }

    static clicaBotaoMeusInvestimentos() {
        cy.initServer('POST', '**CarteiraPrincipalControllerLOUT**');
        super.clicaElemento(botaoMeusInvestimentos);
        cy.validateRequest(200);
    }

    static clicaCardComecandoComPouco() {
        super.clicaElemento(cardComecandoComPouco);
    }

    static clicaCardNovosPorAqui() {
        super.clicaElemento(cardNovosPorAqui);
    }

    static clicaCardMaisBuscados() {
        super.clicaElemento(cardmaisBuscados);
    }

    static clicaBotaoInvestir() {
        super.clicaElemento(botaoInvestir);
    }

    static clicaBotaoRetirar() {
        super.clicaElemento(botaoRetirar);
    }

    static clicaSaibaMais() {
        super.clicaElemento(botaoSaibaMais);
    }

    static clicaTrazer() {
        super.clicaElemento(btnTrazer);
    }

    static clicaComoGanho() {
        super.clicaElemento(btnComoGanho);
    }

    static clicaTrocarPontos() {
        super.clicaElemento(botaoTrocarPontosPi);
    }

    static clicaMinimizarCardPontosPi() {
        super.clicaElemento(botaoMinimizarCardPontosPi);
    }

    static validaHomeLogada() {
        super.validaTextoElemento(helloNickName, 'Oi,');
    }

    static validaExibicaoInstituicao() {
        super.validaTextoElemento(textIntituicaoHome, 'Instituição');
    }

    static validaSaldoExibido() {
        super.validaTextoElemento(iconeSaldo, 'R$');
    }

    static validaNaoExibeSaldo() {
        super.validaTextoElemento(iconeSaldo, '• • • • • •');
    }

    static validaTituloComecandoComPouco() {
        cy.contains('Começando com pouco', { timeout: Cypress.env('global_timeout') });
    }

    static validaTituloNovosPorAqui() {
        cy.contains('Novos por aqui', { timeout: Cypress.env('global_timeout') });
    }

    static validaTituloMaisBuscados() {
        cy.contains('Os mais buscados', { timeout: Cypress.env('global_timeout') });
    }

    static validaTituloCatalog() {
        cy.contains('Renda Variável');
        cy.contains('Renda Fixa');
        cy.contains('Fundos de Investimentos');
        cy.contains('Tesouro Direto');
    }

    static validaTituloResgatar() {
        cy.contains('Como retirar?');
    }

    static validaTituloTrazer() {
        cy.contains('Como adicionar saldo?', { timeout: Cypress.env('global_timeout') });
    }

    static validaTituloGanharPontos() {
        cy.contains('Como ganho?', { timeout: Cypress.env('global_timeout') });
    }

    static validaTituloPagPontosPi() {
        cy.contains('Dividimos nosso ganho com você!', { timeout: Cypress.env('global_timeout') });
    }

    static validaTituloTrocarPontosPi() {
        cy.contains('Quantos pontos deseja trocar?', { timeout: Cypress.env('global_timeout') });
    }
}
