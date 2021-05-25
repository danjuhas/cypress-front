export default class Base {
    static buscaElemento(elemento, index = undefined) {
        let elem;

        if (typeof index !== 'undefined' || index > 0) {
            elem = cy.get(elemento, { timeout: Cypress.env('global_timeout') }).eq(index);
        } else {
            elem = cy.get(elemento, { timeout: Cypress.env('global_timeout') });
        }
        return elem;
    }

    static buscaElementoContem(texto) {
        return cy.contains(texto, { timeout: Cypress.env('global_timeout') }).should('be.visible');
    }

    static buscaElementoXpath(elemento, index) {
        let elem;

        if (typeof index !== 'undefined' || index > 0) {
            elem = cy.xpath(elemento, { timeout: Cypress.env('global_timeout') }).eq(index);
        } else {
            elem = cy.xpath(elemento, { timeout: Cypress.env('global_timeout') });
        }

        return elem;
    }

    static validaTexto(valorbase, valorcomparar) {
        expect(valorbase).to.contains(valorcomparar);
    }

    static validaTextoElemento(elemento, valor) {
        this.textoElemento(elemento).then((text) => {
            expect(text).to.contains(valor);
        });
    }

    static textoElemento(elemento) {
        return this.buscaElemento(elemento).invoke('text');
    }

    static preencheValor(elemento, valor, force = false) {
        if (force === true) {
            this.buscaElemento(elemento).type(valor, { force: true });
        } else {
            this.buscaElemento(elemento).type(valor);
        }
    }

    static preencheValorXPath(elemento, valor, force = false) {
        if (force === true) {
            this.buscaElementoXpath(elemento).type(valor, { force: true });
        } else {
            this.buscaElementoXpath(elemento).type(valor);
        }
    }

    static preencheComDelay(elemento, valor) {
        this.buscaElemento(elemento).type(valor, { timeout: Cypress.env('global_timeout') });
    }

    static clicaElemento(elemento, force = false) {
        if (force === true) {
            this.buscaElemento(elemento).click({ force: true });
        } else {
            this.buscaElemento(elemento).click();
        }
    }

    static verificaElementoExiste(elemento) {
        this.buscaElemento(elemento).should('exist', { timeout: Cypress.env('global_timeout') });
    }

    static selectOption(elemento, opcao) {
        this.buscaElemento(elemento).select(opcao);
    }
}
