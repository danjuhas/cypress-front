import LoginPage from '../pageobject/autenticacao/login.page';
import HomeLogadaPage from '../pageobject/home/homeLogada.page';

const AWS = require('aws-sdk');

const pathCatolog = './cypress/fixtures/catalogo/';

const compareSnapshotCommand = require('cypress-visual-regression/dist/command');

compareSnapshotCommand();

Cypress.Commands.add('verificaMobile', () => {
    if (Cypress.env('userAgent') !== undefined) {
        LoginPage.clicaAcessarConta();
    } else {
        cy.log('Desktop');
    }
});

Cypress.Commands.add('fazLogin', () => {
    cy.verificaMobile();
    LoginPage.digitaEmail();
    LoginPage.digitaSenha();
    LoginPage.clicaBotaoLogin();
    HomeLogadaPage.validaHomeLogada();
});

/** Espera na pagina alguns elementos que estão com load */

Cypress.Commands.add('waitLoad', () => {
    const imgCarregando = '//*[@id="container"]/main/div[4]/div';
    cy.xpath(imgCarregando, { timeout: Cypress.env('global_timeout') }).should('not.be.visible');
});

/** Servidor XHR que verifica alguns serviços no site */

Cypress.Commands.add('initServer', (method, url) => {
    cy.server({
        whitelist: () => false,
    });
    cy.route(method, url).as('waitEventXhr');
});

/** Servidor XHR valida alguns serviços no site */

Cypress.Commands.add('validateRequest', (code) => {
    cy.wait('@waitEventXhr', { timeout: Cypress.env('global_timeout') }).then((xhr) => {
        expect(xhr.status).be.eq(code);
    });
    cy.server({ enable: false });
});

/** Servidor XHR valida chamadas Graphql no site se está com retorno 200 */

Cypress.Commands.add('waitGraphql', (params) => {
    cy.server({
        whitelist: () => false,
    });
    cy.route('POST', params).as('graphql');
    cy.wait('@graphql', { timeout: Cypress.env('global_timeout') }).then((xhr) => {
        expect(xhr.status).be.eq(200);
    });
    cy.server({ enable: false });
});

Cypress.Commands.add('saveCatalogJSON', (result, type) => {
    cy.writeFile(`${pathCatolog}${type.toLowerCase()}HML.json`, result);
});


/** Realiza chamada na API do grapqhl
 *  que retorna todos os produtos do catalogo com status ativo por produto,
 *  e salva em um JSON no fixtures
 */


Cypress.Commands.add('dataCatalog', (typeProduct) => {
    const query = `query {
        products (
            partnerId: "EXAMPLE"
            catalogId: "DEFAULT_EXAMPLE"
            filter: [
                { field: "type", value: "${typeProduct}" }
            ]) 
        {
        items {
            inactive
            title
            issuerName
            subType
            isFavorite
            exclusiveFund
            closedForInvestment
            riskRate
            type
            id
            externalId
            isQualifiedInvestor
            lackDescription
            hasFGC
            hasIR
            minApplicationValue
            portfolioFamily
            redemptionLiquidadationDescription
            subTypeDescription
        }
      }
    }`;
    cy.request({
        url: 'https://examplo.com.br/graphql',
        method: 'POST',
        body: { query },
        failOnStatusCode: false,
    }).its('.').should('not.be.empty')
        .then(((res) => cy.saveCatalogJSON(res.body.data, typeProduct)));
});

/** Busca o token da AWS Dynamo e entrega
 * para as chamadas que precisa de autenticação para realizar aplicação
 * * */


Cypress.Commands.add('tokenAWS', (valor = '') => {
    AWS.config.update({
        region: 'example',
        accessKeyId: 'ABC12345',
        secretAccessKey: 'ABC12345',
    });
    cy.fixture(`autenticacao${Cypress.env('environment')}`).as('authSalesforce').then((data) => {
        let emailSuccess;
        if (valor === '') {
            emailSuccess = data.emailSuccess;
        } else {
            emailSuccess = valor;
        }
        const params = {
            TableName: 'user-authentication',
            Key: {
                email: { S: `${emailSuccess}` },
            },
        };
        const ddb = new AWS.DynamoDB();
        const item = ddb.getItem(params).promise();
        cy.wrap(item).as('res');
    });
});

// data.Item.code.L[0].M.code.S
