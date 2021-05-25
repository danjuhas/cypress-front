<div>
    <p  align="center">
    	<a>
    	    <img  alt="Cypress Front"  src="https://i0.wp.com/rightsaidjames.com/wp/wp-content/uploads/2021/03/cypress.jpg?fit=400%2C400&ssl=1"  width="100">
    	</a>
    </p>
</div>

<div>
    <p  align="center">
    	Repositório de Smoke tests em automação de UI
    </p>
</div>
  

## Usando pela primeira vez

 

 1. Clonando o repositório

Temos que clonar o repositório em sua máquina para que possamos desenvolver/visualizar os testes. Para isso, configure seu [SSH em sua conta](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html):
```
$ git clone git@github.com:danjuhas/cypress-front.git
```

ou prossiga usando o seu usuário e senha pela linha de comando usando o *HTTPS*:
```
$ git clone https://github.com/danjuhas/cypress-front.git
```

 2. Instalando os pacotes

Após o repositório ser clonado, acesse-o pela linha de comando do seu sistema operacional e estando na raiz, use o comando:
```
$ npm install
```

 3. Executando o cypress

Depois de todos os pacotes serem instalados corretamente, podemos executar a interface do cypress usando:
```
$ npx cypress open
```
  

## Estrutura

Como as pastas e os arquivos fixos são usados dentro do projeto

***

  

### Fixtures

  

Dentro da pasta fixtures colocamos todos os ``.json`` que contém dados mocados e que vão ser usados dentro dos testes.

  

### Integration

  

Dentro da pasta integration colocamos todos os ``.spec.js`` que contém os cenários que vamos testar.

### Pageobjects


Dentro da pasta pageobjects colocamos todos os ``.page.js`` que contém todos os elementos e ações que usaremos nos cenários.
  

### Plugins

  

Dentro da pasta plugins colocamos todos os ``.js`` que podemos usar para escrever seu próprio código personalizado que é executado durante estágios específicos do ciclo de vida do Cypress.

  

### Snapshots

  

Dentro da pasta snapshots, que fica de fora do versionamento, o cypress insere todas as imagens printadas quando há uma falha na execução.

  

### Support

  

Dentro da pasta plugins colocamos todos os ``.js`` que usamos para criar configurações/comportamentos globais que modifica o cypress.

  

### .eslintrc

  

É um arquivo de configuração onde são definidos parâmetros para indicar qual o codestyle usamos e pra identificar erros de código antes mesmo deste ser executado.

  

### .gitignore

  

É um arquivo que permite ignorar pastas e outros arquivos no versionamento.

  

### cypress-automation-run.js

  

É um arquivo no qual configuramos a execução programaticamente do cypress para ser usado dentro do jenkins, onde possui configurações de report e de tratamento das imagens.

  

### cypress.json

  

É um arquivo de configuração do cypress.

  

### dockerfile

  

É um arquivo que determina quais passos o docker deve seguir ao executar nosso container.

  

### Jenkinsfile

  

É um arquivo que configura as nossas builds dentro do jenkins, indicando quais são os passos e como o jenkins deve executar tudo.

  

### package.json

  

É um arquivo que determina quais os pacotes usamos e devemos instalar no projeto para que esse seja executado devidamente.



## Como a build funciona?

Temos nossa própria visualização de jobs dentro do jenkins, onde criamos e configuramos estes para executarem em momentos específicos do dia e com branchs/repositórios pré-determinados.
A nomenclatura dos job's costumam seguir o padrão:
```
{ambiente}-qa-{o projeto a ser testado}
```

Então, o repositório atual usa:
```
HML-qa-react-automation
```
ou
```
PRD-qa-react-automation
```

## Padronização de código e nomes

Padronizamos que nesse projeto utilizaremos o mesmo codestyle apresentado pelo airbnb e que será reforçado com o eslint.

- Nomes de pastas e de variáveis sempre em camel case. Pascal case apenas pra classes e instâncias dessas classes.
- Variáveis podem ser em inglês ou portugês, desde que sejam claras quanto à sua função
- Evitar o máximo usar For e While
- Arquivos de cenários `.spec.js` devem ser claros sobre o fluxo do teste e nunca conter seletores e condicionais, pra isso existe o pageobject
- Evitar o máximo deixar código comentado para não poluir os cenários e pages
- Comandos não devem ser adicionados ao cypress, mas existem exceções
- Nunca devemos realizar testes salvando arquivos estáticos localmente, quando a build for executada no jenkins eles serão ignorados
- Prints da tela servem apenas para cenários que falham, e isso o cypress já faz automaticamente
- Os cenários SEMPRE devem ser independentes entre si. Caso um falhe, o outro possa ao menos tentar executar corretamente


## Padronização de commit e branch

Padronizamos que neste projeto utilizaremos:

- Commits em inglês
- Branchs com os nomes das tarefas
- Caso a branch não possua tarefa, utilizar Hotfix/ antes do nome da branch, que também deve ser em inglês
- Ao adicionar um commit na sua branch, será executado um script que verificará se há erros em seu código e se houver, não será realizado seu commit até a correção

## Merge request

Por padrão, bloqueamos as branchs de developer e master para não aceitarem nenhum commit, então o único método de inserir suas alterações é por meio de uma merge request.

Você deve criar uma branch com suas alterações a partir da origem que mais tarde iremos inseri-los, realizar as alterações e o commit e por último criar uma merge request da sua branch para a branch de destino, a qual deve receber suas alterações.

A merge request será automaticamente enviada em nosso grupo que contém todos os QA's para passar pelo processo de aprovação, onde a MR deve ser aprovada por pelo menos 2 outros QA's. Após isso, o autor da MR deve mergear manualmente sua branch na branch de destino.

## Comandos extras

Executar lint no projeto para demonstrar erros de código e de padronização:
```
$ npm run lint
```

Alguns erros apresentados podem ser corrigidos automaticamente pelo próprio linter:
```
$ npm run lint:fix
```

Executar todos os testes em headless programaticamente:
```
$ npm run start
```

## Links úteis

- [Regras do eslint caso algum erro seja exibido](https://eslint.org/docs/rules/)
- [Codestyle utilizado no projeto](https://github.com/airbnb/javascript)
- [Documentação do cypress](https://docs.cypress.io/)

***
![badge](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)