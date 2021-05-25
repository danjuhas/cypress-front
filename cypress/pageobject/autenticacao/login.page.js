import Base from '../base/base.page';
// elementos
const botaoLogin = '//*[@id="container-master"]/div/div/div[2]/div/div[3]/div[2]/div[2]/button';
const campoEmail = '#email';
const campoSenha = '#password';
const tipoCampoSenha = '[type=password]';
const toggleLembrar = 'input[type="checkbox"]';
const olhoExibeSenha = 'div > div > svg';
const campoMsgErro = '.sc-fzoydu';
// const linkEsqueceuSenha = '.sc-hzDkRC'
const linkCadastro = "//a[text()='Ainda não possui uma conta?']";
const linkCadastroMobile = '#container-master > div > div > a:nth-child(1)';
const botaoVoltarPagLogin = 'a > svg';
const textMsgTelaLogin = 'h1';
const msgErro = 'Usuário ou senha incorreta, verique se digitou tudo certinho';
const msgErroAlt = 'Tente novamente em 15 minutos.';
const btnAcessarConta = '#container-master > div > div > a:nth-child(2)';
// fixture
const autenticacao = `autenticacao${Cypress.env('environment')}`;

export default class LoginPage extends Base {
    static preencheLogin(email, senha) {
        super.preencheValor(campoEmail, email);
        super.preencheValor(campoSenha, senha);
        cy.contains('ENTRAR NA MINHA CONTA').click();
    }

    static loginCardTransicao(email, senha) {
        super.preencheValor(campoEmail, email);
        super.preencheValor(campoSenha, senha);
        cy.initServer('GET', '**hom/v1/purchase/orders**');
        cy.contains('ENTRAR NA MINHA CONTA').click();
        cy.validateRequest(200);
    }

    static digitaEmail() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(campoEmail, dataLoader.emailSuccess);
        });
    }

    static digitaEmailReaplicacao() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(campoEmail, dataLoader.emailReaplicacao);
        });
    }

    static digitaEmailTD() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(campoEmail, dataLoader.emailSuccessTD);
        });
    }

    static digitaSenha() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(campoSenha, dataLoader.passwordSuccess);
        });
    }

    static digitaSenhaTD() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(campoSenha, dataLoader.passwordTD);
        });
    }

    static digitaEmailPontosPi() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheComDelay(campoEmail, dataLoader.emailPontosPI);
        });
    }

    static digitaEmailNaoCadastrado() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheComDelay(campoEmail, dataLoader.unregisteredEmail);
        });
    }

    static digitaEmailInvalido() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheComDelay(campoEmail, dataLoader.invalidEmail);
        });
    }

    static digitaEmailFailure() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheComDelay(campoEmail, dataLoader.emailFailure);
        });
    }

    static digitaEmailUsuarioSemSuitability() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheComDelay(campoEmail, dataLoader.emailSemSuitability);
        });
    }

    static digitaEmailUsuarioBloqueioPLD() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheComDelay(campoEmail, dataLoader.emailBloqueioPLD);
        });
    }

    static digitaEmailUsuarioSemSaldo() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheComDelay(campoEmail, dataLoader.emailSemSaldo);
        });
    }

    static digitaSenhaMaisCaracter() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(campoSenha, dataLoader.passwordMoreCaracter);
        });
    }

    static digitaSenhaCaracterEspecial() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(campoSenha, dataLoader.passwordEspecialCaracter);
        });
    }

    static digitaSenhaErrada() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(campoSenha, dataLoader.passwordFailure);
        });
    }

    static digitaSenhaEapagaUmCaracter() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(campoSenha, `${dataLoader.passwordSuccess}, '{backspace}'`);
        });
    }

    static digitaSenhaEapaga() {
        cy.fixture(autenticacao).as('dataLoader').then((dataLoader) => {
            super.preencheValor(campoSenha, `${dataLoader.passwordSuccess}, '{selectall}{backspace}'`);
        });
    }

    static ativaLembrarEmail() {
        super.clicaElemento(toggleLembrar, true);
    }

    static clicaBotaoLogin() {
        cy.contains('ENTRAR NA MINHA CONTA').click();
    }

    static doubleClickBotaoLogin() {
        cy.contains('ENTRAR NA MINHA CONTA').dblclick({ force: true });
    }

    static clicaExibirSenha() {
        super.clicaElemento(olhoExibeSenha);
    }

    static clicaEsqueceuSenha() {
        cy.contains('Esqueceu sua senha? Clique aqui').click();
    }

    static clicaLinkCadastro() {
        if (Cypress.env('userAgent') !== undefined) {
            super.clicaElemento(linkCadastroMobile);
        } else {
            super.buscaElementoXpath(linkCadastro).click();
        }
    }

    static clicaVoltarPaginaLogin() {
        super.clicaElemento(botaoVoltarPagLogin);
    }

    static validaMsgTelaLogin() {
        super.buscaElemento(campoEmail);
        super.validaTextoElemento(textMsgTelaLogin, 'Acessar Conta');
    }

    static validaBotaoLoginHabilitado() {
        super.buscaElementoXpath(botaoLogin).should('be.enabled');
    }

    static validaBotaoLoginDesabilitado() {
        super.buscaElementoXpath(botaoLogin).should('be.disabled');
    }

    static validaMsgConfiraCredenciais() {
        cy.contains('Confira seu e-mail e senha');
    }

    static validaMsgDigiteNovamente() {
        cy.get(campoMsgErro).then(($body) => {
            if ($body.text().includes('Usuário ou senha incorreta')) {
                super.validaTextoElemento($body, msgErro);
            } else {
                super.validaTextoElemento($body, msgErroAlt);
            }
        });
    }

    static validaMsgEmailInvalido() {
        cy.contains('Por favor forneça um e-mail válido');
    }

    static validarQtdeCaracterSenha() {
        super.buscaElemento(campoSenha).should('have.value', '123456');
    }

    static validaSenhaInvalida() {
        super.buscaElemento(campoSenha).should('have.value', '');
    }

    static validaSenhaExibida() {
        super.buscaElemento(tipoCampoSenha).should('not.exist');
    }

    static validaSenhaNaoExibida() {
        super.buscaElemento(tipoCampoSenha).should('exist');
    }

    static validaMsgTelaEsqueceuSenha() {
        cy.contains('REDEFINIR SENHA');
    }

    static clicaAcessarConta() {
        super.clicaElemento(btnAcessarConta);
    }
}
