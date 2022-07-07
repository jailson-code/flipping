# Flipping

Flipping é um mini _servidor estático_ e _template frontend_ para projetos do tipo **single page application** (SPA), desenvolvido em **JavaScript Puro** (sem framework) por [Jailson Lima]().

> [English version]()

## Single Page Application

A organização do _template frontend_ com a _Single Page Application_ fica dentro da pasta `static`.

```
├── static
│   ├── assets
│   │   ├── css
│   │   ├── fonts
│   │   ├── html
│   │   ├── images
│   │   ├── js
│   ├── css
│   │   ├── layout.css
│   ├── js
│   │   ├── components
│   │   ├── core
│   │   ├── environment
│   │   ├── models
│   │   ├── routes
│   │   ├── utility
│   │   ├── views
│   │   ├── main.js
│   │   ├── startup.js
|   ├── index.html
```

> **Nota**: A organização do conteúdo da pasta `static` é totalmente livre.

### Pastas: `assets`, `css` e `js`

As pastas `assets`, `css` e `js` são apenas uma sugestão e se destinam a conter:

- `assets`: pastas `css`, `fonts`, `html`, `images` e `js`, para guardar fontes, imagens e arquivos _css_ e _js_ de bibliotecas externas. A pasta `html` é o local para guardar as páginas customizadas de erro `404.html` e `500.html`, _opcionais_.
- `css`: arquivos _CSS_ como `layout.css`, por exemplo.
- `js`: arquivos _JavaScript_ da aplicação.

### `index.html`

Contem a marcação global e também é o ponto de partida da aplicação. Deve conter 3 itens:

- Um elemento `link` para o `layout.css`.
   ```html
   <link rel="stylesheet" href="/css/layout.css">
   ```
- Um elemento `div` com o `id` da aplicação.
   ```html
   <div id="app"></div>
   ```
- Um elemento `script` para o `main.js`.
   ```html
   <script type="module" src="/js/main.js"></script>
   ```

### `layout.css`

O arquivo `layout.css` contem o _CSS_ principal da aplicação, mas podem ser adicionados outros.

### `main.js`

Contem o código principal da aplicação.

```javascript
import { Application } from "./core/core.js"
import { routes } from "./routes/routes.js"
import { environment } from "./environment/environment.js"
import { components } from "./components/components.js"
import { startup } from "./startup.js"

let app = new Application("app")
app.routes = routes
app.stack.push(environment)
app.stack.push(components)
app.stack.push(startup)
app.run()
```

No código acima criamos um objeto `Application`, que representa a _SPA_, passando para o seu construtor o mesmo valor do `id` do elemento `div#app` declarado em `index.html`. Em seguida, passamos as **rotas** da aplicação, definidas em `routes.js`. Depois, passamos para a _pilha de inicialização_ da aplicação, as funções definidas em `environment.js`, `components.js` e `startup.js`.

> **Nota**: A ordem em que as funções de inicialização são passadas para a pilha da aplicação é a ordem em que elas serão executadas. Sempre passamos a função do módulo `environment.js` primeiro, para carregar as **variáveis de ambiente** da aplicação.

### `startup.js`

Contem o código global que pode ser utilizado pelas _views_, por exemplo. Ou código geral que precisa ser executado antes da aplicação iniciar.

### Rotas

As _rotas_ são definidas no arquivo `routes.js` dentro da pasta `routes`.

```javascript
import { Dashboard } from "../views/dashboard.js"
import { TaskList } from "../views/task-list.js"
import { PlaceList } from "../views/place-list.js"
import { Settings } from "../views/settings.js"

export const routes = [
   {path: "/", view: Dashboard},
   {path: "/tasks", view: TaskList},
   {path: "/places", view: PlaceList},
   {path: "/settings", view: Settings}
]
```

**Roteamento**:

O acesso as _views_ pelas rotas pode ser feito na marcação através de um elemento `a` com o atributo `data-link`:

```html
<ul>
   <li><a href="/" data-link>Dashboard</a></li>
   <li><a href="/tasks" data-link>Tasks</a></li>
   <li><a href="/places" data-link>Places</a></li>
   <li><a href="/settings" data-link>Settings</a></li>
</ul>
```

No código através do método `navigate(url)` disponível em toda a aplicação através do **objeto global** `app`:

```javascript
app.navigate("/tasks")
```

Ou digitando a _URL_ completa da rota na _barra de endereço_ do navegador. Por exemplo:

```
http://localhost:3000/tasks
```

**Ancoragem através da hash na URL:**

A ancoragem em um elemento com `id` igual a `hash` da _URL_ pode ser feita de três formas:

1. Diretamente pela **barra de endereço** do navegador, digitando a _URL_:
   ```
   http://localhost:3000/tasks#new-task
   ```
2. Dentro da **mesma view**. Nesse caso utilizamos um elemento `a` simples, sem o atributo `data-link`:
   ```html
   <a href="#new-task">New Task</a>
   ```
3. Para **outra view**. Nesse caso é necessário utilizar um elemento `a` com o atributo `data-link`:
   ```html
   <a href="/tasks#new-task" data-link>New Task</a>
   ```
   ou utilizar o método `navigate(url)` no código:
   ```javascript
   app.navigate("/tasks#new-task")
   ```

### Views

As _views_ ficam dentro da pasta `views`. Por exemplo, a _view_ `Dashboard` fica definida no arquivo `dashboard.js` dentro da pasta `views`.

```javascript
import { View } from "../core/core.js"

export class Dashboard extends View {
   constructor() {
      super("dashboard", "Dashboard")
   }

   async create() {
      super.create()

      this.element.innerHTML = `
         <h1>Dashboard</h1>
         <p>See the complete to-do list:</p>
         <button id="dashboard__to-do-list">To-do List</button>
      `

      let toDoList = document.querySelector("#dashboard__to-do-list")

      toDoList.addEventListener("click", event => {
         app.navigate("/tasks")
      })
   }
}
```

As _views_ devem estender a class `View` e passar os parâmetros `id` e `title` para o construtor da superclasse:

Construtor da classe `View`:

```javascript
View(id [, title])
```

Onde:

- `id`: será o `id` utilizado na `div` que irá representar a _view_ em **`index.html`**.
- `title`: é o título do `document`, ou seja, da página quando a _view_ é exibida. _Opcional_.

A classe `View` contem 4 métodos assíncronos que podem ser sobrescritos, que são: `create()`, `update()`, `inside()` e `outside`.

- `create`: Utilizado para definir marcação, estilo e comportamento da _view_ que será executado uma única vez quando a _view_ for instanciada, e antes que ela seja exibida pela primeira vez. É chamado no _construtor_ da superclasse.
- `update`: Contem marcação, estilo e comportamento da _view_ que precisam ser atualizados sempre que ela entrar em cena. É chamado no método `inside()` da superclasse.
- `inside`: É o local para colocar o código que deverá ser executado sempre que a _view_ entrar em cena.
- `outside`: É o local para colocar o código que deverá ser executado sempre que a _view_ sair de cena.

> **Nota**: Ao sobrescrever os métodos da classe `View` a primeira linha do corpo do método deve sempre ser uma chamada ao método da superclasse.

### Modelos

Os modelos de dados utilizados na aplicação ficam no arquivo `models.js` dentro da pasta `models`. Exemplo:

```javascript
import { gid, timestamp } from "./utility.js"

// Task model.
export class Task {
   constructor(title) {
      this.title = title || ""
      this.completed = false
      this.timestamp = timestamp()
      this.placeId = ""
      this.id = gid()
   }
}
```

> Os modelos podem ser separados em arquivos individuais para cada modelo.

### Utilitários

Objetos e funções utilitárias podem ser definidos no arquivo `utility.js` dentro da pasta `utility`. Exemplo:

```javascript
// Identifier generator.
export const gid = () => {
   const mask = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
   return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, () => mask[Math.random() * mask.length | 0])
}

// Timestamp generator.
export const timestamp = date => {
   if (date)
      return new Date(date).toISOString()
   else
      return new Date().toISOString()
}
```

### Componentes Web

Componentes web (_web components_) podem ser definidos no arquivo `components.js` dentro da pasta `components`. Exemplo:

```javascript
class CheckIcon extends HTMLElement {
   constructor() {
      super()
   }
}
```

### `environment.js`

É nesse arquivo de definimos a _variável global_ `env` que serve para guardar constantes de configuração, objetos e funções globais disponíveis em toda a aplicação. A função `environment()` passada para a _pilha de inicialização_ de `app` é quem inicializa a variável global `env`.

```javascript
export const environment = () => {
   // Global variables and functions.
   const env = {
      BASE_URL: ""
   }

   // Sets the env global variable.
   window.env = env
}
```

### `core.js`

O arquivo `core.js` é o responsável pelo funcionamento correto da _Single Page Application_. É nele que definimos as classes `Application`, `Router` e `View` que servem para:
- `Application`: representa a **single page application** em si, contém a lista de _rotas_ com suas respectivas _views_, o _roteador_, a _pilha de funções de inicialização_, e uma referência ao elemento `div#app` que representa a raiz _DOM_ da _SPA_. Contem também os métodos `run()` utilizado para iniciar a aplicação e `navigate(url)` utilizado para ir para uma rota específica.
- `Router`: representa o **roteador** da aplicação, contém a lista de _rotas_ e _views_, além das rotas _atual_ e _anterior_. Ele também contem o objeto `params` com os parâmetros (_chave/valor_) extraídos de _rotas parametrizadas_, como por exemplo: `/tasks/[id]` sempre com relação a rota atual. Contem o método `routing()` chamado no seu construtor para iniciar o roteamento da aplicação.
- `View`: representa as **views** da aplicação, ou seja, os componentes com marcação, estilo e comportamento que são acessados pelas _rotas_. Contem os métodos: `create()`, `update()`, `inside()` e `outside()`.

O `core.js` contém outros elementos importantes para a _Single Page Application_, além das classes citadas, como por exemplo as funções `resolveURL()`, `regexURL()`, `getParams()` e `changeRoute()`, e também serve para abstrair a complexidade inerente do funcionamento da aplicação, permitindo que aplicações _SPA_ possam ser desenvolvidas de forma simples.

### Variáveis Globais

São definidas duas variáveis globais: `env` e `app`.
- `env`: é a variável global utilizada para tornar disponível em toda a aplicação: **constantes de configuração**, **objetos** e **funções globais**, e **objetos views** caso seja necessário, como por exemplo, para chamar um método da _view_ a partir da marcação:
   ```html
   <check-icon onclick="env.taskList.checkTask(this)"></check-icon>
   ```
- `app`: é o próprio objeto `Application`, definido em `main.js`, que é configurado como variável global pelo seu construtor, para que suas propriedades e métodos, como por exemplo `navigate(url)`, possam ficar disponíveis em toda a aplicação.

## Classe `Application`

A classe `Application` representa a _Single Page Application_ em si.

**Construtor:**

```javascript
Application(id)
```

O construtor da classe `Application` recebe um único parâmetro que é o `id` do elemento `div#app` declarado em `index.html`. É nesse elemento `div` que o objeto `Application` vai inserir os elementos `div` dos objetos `View` para cada rota.

**Propriedades:**

- `element`: objeto `HTMLElement` da `div#app`. A partir dele podemos acessar toda a árvore _DOM_ da _SPA_.
- `routes`: array com as rotas declaradas em `routes.js`.
- `router`: objeto `Router` que irá fazer o roteamento da _SPA_.
- `stack`: pilha de funções síncronas de inicialização executadas antes da criação das _views_ quando o método `run()` é chamado.
- `onroute`: função de callback assíncrona executada sempre que houver uma mudança de rota. Ela recebe um único parâmetro, `route`, que é a rota atual da aplicação. Exemplo de uso:
   ```javascript
   app.onroute = async route => {
      console.log(route)
   }
   ```

**Métodos:**

```javascript
run()
```

O método `run()` serve para inicializar a aplicação. Ele executa as funções da _pilha de inicialização_ na ordem em que são colocadas, e só então criar o objeto `Router`, passando para ele o array `routes` que contem as rotas. O objeto `Router` por sua vez irá passar por cada uma das _rotas_ e criar as respectivas _views_ que foram declaradas.

```javascript
navigate(url)
```

O método `navigate(url)` serve para ir para uma determinada rota indicada pela `url` passada como parâmetro.

## Classe `View`

A classe `View` representa as _views_ da _Single Page Application_. Toda classe _view_ da aplicação deve estender essa classe.

**Construtor:**

```javascript
View(id [, title])
```

O construtor da classe `View` recebe dois parâmetros. O primeiro é o `id` que será utilizado como `id` da `div` que irá representar a _view_ na marcação. O segundo, que é opcional, é o `title`, que é o título da página quando a _view_ é exibida.

**Propriedades:**

- `element`: objeto `HTMLElement` da `div#id` que representa a _view_ na marcação. A partir dele pode ser acessado toda a árvore _DOM_ da _view_.
- `title`: título da _view_.

> Note que o `id` passado para o construtor não existe como uma propriedade da classe `View`. Mas pode ser acessado a partir da propriedade `element`: `this.element.id`.

**Métodos:**

```javascript
create()
```

O metódo `create()` deve ser utilizado para definir marcação, estilo e comportamento da _view_ que será executado uma única vez quando a _view_ for instanciada, e antes que ela seja exibida pela primeira vez. É chamado no _construtor_ da classe `View`. Esse método, em geral, deve conter a **marcação fixa** da _view_ e seu comportamento associado.

```javascript
update()
```

O metódo `update()` deve ser utilizado para definir marcação, estilo e comportamento da _view_ que precisam ser atualizados sempre que ela entrar em cena. É chamado no método `inside()` da classe `View`. Em geral, esse método deve conter a **marcação dinâmica** da _view_ e seu comportamento associado.

```javascript
inside()
```

O metódo `inside()` é executado sempre que a _view_ entra em cena. Assim, qualquer código que precise ser executado no momento em que a _view_ é exibida deve ser chamado nesse método.

```javascript
outside()
```

O metódo `outside()` é executado sempre que a _view_ sai de cena. Assim, qualquer código que precise ser executado no momento em que a _view_ deixa de ser exibida deve ser chamado nesse método.

## Classe `Router`

A classe `Router` representa o _roteador_ da _Single Page Application_. A classe `Application` contem a propriedade `router` que é um objeto `Router`, que é instanciado quando o método `run()` é executado. Assim, objetos `Router` não são criados de forma manual.

**Construtor:**

```javascript
Router(routes)
```

O construtor da classe `Router` recebe o array `routes` contendo as _rotas_ definidas em `routes.js`. É ele quem itera pelas rotas e instancia cada uma das _views_ definidas.

**Propriedades:**

- `routes`: array com as **rotas** registradas da _SPA_.
- `route`: rota atual (_corrente_).
- `previous_route`: rota anterior.
- `pathname`: _pathname_ da rota atual.
- `search`: _search_ com as _query string_ da rota atual.
- `hash`: _hash_ da rota atual.
- `params`: objeto com os _parâmetros_, `chave: valor`, das **rotas parametrizadas**, se houver, extraído de `pathname`. Por exemplo: se for registrado uma rota: `/tasks/[id]`, e for acessado a URL: `/tasks/1234`, então a propriedade `params` irá conter o objeto `{id: "1234"}`.
- `queries`: objeto com as _query string_ da rota atual, extraído de `search`. Por exemplo: se `search` contiver a string `"?name=Newton?age=21"`, então `queries` irá conter o objeto `{name: "Newton", age: "21"}`.

Observe que, podemos acessar as propriedades do _roteador_ dentro das _views_ através da variável global `app`. Em geral, as mais utilizadas são: `route`, `params` e `queries`. Por exemplo, em uma _view_ chamada `TaskView` que se destina a mostrar os detalhes de uma tarefa a partir do seu `id` passado na _URL_. Se a _view_ foi registrada da forma:

```javascript
routes = [
   {path: "/tasks/[id]", view: TaskView}
]
```

Então, dentro do método `update()` da _view_ `TaskView`, podemos buscar e exibir a tarefa cujo `id` é passado pela URL: `/tasks/1234`, por exemplo. E temos acesso aos parâmetros através de `app.router.params`.

```javascript
async update() {
   super.update()

   // Searching for the correct task by id.
   const id = app.router.params.id
   const task = this.tasks.find(task => task.id == id)

   // Viewing the task.
   if (task)
      this.element.innerHTML = `<h1>${task.title}</h1>`
   else
      this.element.innerHTML = "<h1>Task not found.</h1>"
}
```

**Métodos:**

```javascript
routing()
```

O metódo `routing()` é responsável por iniciar o processo de **roteamento** da _Single Page Application_. Ele é chamado no _construtor_ de `Router` depois que todas as _views_ foram criadas.

## Organização do CSS

O padrão de organização de estilo _CSS_ utilizado é apenas uma recomendação, e pode ser modificado, organizado de inúmeras outras formas. Depois que o método `run()` é executado o elemento `body` da marcação em `index.html` irá ficar com o seguinte conteúdo:

```html
<body>
   <div id="app">
      <div class="view" id="dashboard"></div>
      <div class="view" id="task-list"></div>
      <div class="view" id="place-list"></div>
      <div class="view" id="settings"></div>
   </div>

   <script type="module" src="/js/main.js"></script>
</body>
```

Dessa forma, a sugestão é organizar o _CSS_ das _views_ em `layout.css` da seguinte forma:

```css
/* General */

* {
   margin: 0;
   padding: 0;
}

:root {
   --color-primary: #0088EE;
   --color-background: #FFFFFF;
}

html {
  scroll-behavior: smooth;
}

body {
   background-color: var(--color-background);
   overflow-x: hidden;
}

/* Web Components */

check-icon {
   position: relative;
}

/* Application */

#app {}

/* View */

.view {}

/* Dashboard */

#dashboard {}

/* Tasks */

#task-list {}

/* Places */

#place-list {}

/* Settings */

#settings {}
```

> Uma outra forma, seria deixar o estilo global, o estilo externo de _web components_ e o estilo de `#app` e `.view` em `layout.css`, e criar arquivos _CSS_ próprios para cada uma das _views_, e chamar todos eles em `index.html`.

Note que as classes `View` ainda podem inserir e modificar estilo _CSS_ dos seus componentes, se isso for necessário.

## Servidor Estático

O **servidor de arquivos estáticos** processa apenas os arquivos dentro da _pasta estática_ `static`, que é a pasta com os arquivos públicos da aplicação frontend. Requisições para acessar arquivos fora dessa pasta não são permitidas.
A estrutura de organização da pasta do projeto segue abaixo. O nome genérico da pasta `project` deve ser substituído pelo nome específico do projeto a ser desenvolvido.

```
├── project
│   ├── resource
│   │   ├── constants.js
│   │   ├── settings.js
│   │   ├── terminal.js
│   ├── static
│   ├── package.json
│   ├── server.js
```

Os arquivos da pasta `resource`: `constants.js`, `settings.js` e `terminal.js` contém constantes e funções utilizadas pelo servidor. Em especial o arquivo `settings.js` contem as configurações de porta, pasta estática e cache do servidor que podem ser editadas caso seja necessário. Na pasta `static` fica a aplicação frontend em si. O arquivo `package.json` é o arquivo descritor do projeto. Por fim, o arquivo `server.js` contem o código principal do **servidor de arquivos estáticos** para a aplicação frontend do tipo **single page application**.

**Regras do servidor:**

1. Se for requisitado um **caminho válido**, ou seja, que exista dentro da pasta estática, o servidor irá:
   1.1 Verificar se o caminho representa um **arquivo** ou um **diretório**.
   1.2 Se for um **arquivo**, ele devolve o arquivo requisitado.
   1.3 Se for um **diretório** ele tenta encontrar um arquivo `index.html` no diretório e devolve.
2. Se o **caminho** requisitado **não existir**, o servidor irá:
   2.1 Verificar se o caminho, mesmo não existindo, representa um **arquivo** ou um **diretório**.
   2.2 Se for um **arquivo**, ele retorna _404 Not Found_.
   2.3 Se for um **diretório** ele retorna o arquivo `index.html` da raiz da pasta estática, e deixa que a _single page application_ faça o **roteamento virtual** do lado do navegador.

> **Nota**: Se em qualquer dos casos _1.2_, _1.3_ ou _2.3_ o arquivo que será devolvido não existir ou ocorrer um erro de leitura, o servidor retornará _404 Not Found_. Em caso de erro _404 Not Found_ ou _500 Internal Server Error_ no processamento de uma requisição, o servidor irá procurar por páginas de erro customizadas `404.html` e `500.html` respectivamente, na pasta `/static/assets/html` para retornar. Essas páginas são opcionais.