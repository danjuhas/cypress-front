import Base from '../base/base.page';
// elementos
const tituloPagCadastro = '.tituloChamado';

export default class CadastroPage extends Base {
    static clicaBotaoFazerLogin() {
        cy.contains('Fazer login').click();
    }

    static validaTituloCadastro() {
        super.validaTextoElemento(tituloPagCadastro, 'Vamos começar?');
    }
}
