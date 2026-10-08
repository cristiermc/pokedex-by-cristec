# Pokédex TypeScript Lite

Aplicação de terminal desenvolvida em **Node.js + TypeScript** para consultar informações de Pokémon na **PokeAPI**, transformar os dados recebidos em uma estrutura simplificada e manter um catálogo local persistido em arquivo JSON.

O projeto foi desenvolvido como mini-projeto avaliativo do curso **Fundamentos para Back-end: JavaScript, TypeScript e PostgreSQL**, com foco na prática de TypeScript, consumo de API, programação assíncrona, classes, interfaces, métodos de array, modularização, organização do código e persistência simples em arquivo JSON.

---

## 📌 Objetivo

Desenvolver uma aplicação back-end simples executada pelo terminal capaz de:

* consultar Pokémon na PokeAPI;
* tratar Pokémon inexistentes;
* transformar a resposta da API em um objeto simplificado;
* adicionar Pokémon a um catálogo local;
* persistir o catálogo no arquivo `pc_box.json`;
* impedir a inclusão de Pokémon duplicados;
* listar os Pokémon cadastrados;
* remover Pokémon pelo ID;
* demonstrar o fluxo completo da aplicação.

O projeto foi mantido propositalmente simples, de acordo com o escopo do mini-projeto.

---

## 🛠️ Tecnologias utilizadas

* **Node.js** — ambiente de execução JavaScript no back-end;
* **TypeScript** — tipagem estática e organização do código;
* **TSX** — execução do TypeScript durante o desenvolvimento;
* **PokeAPI** — fonte externa dos dados dos Pokémon;
* **Fetch API** — consumo da API externa;
* **Node.js File System API** — leitura e escrita do catálogo em arquivo JSON;
* **Git** — controle de versão;
* **GitHub** — hospedagem do repositório e organização do projeto.

> O projeto não utiliza banco de dados. O catálogo é persistido localmente no arquivo `pc_box.json`.

---

## 📋 Requisitos

Para executar o projeto, é necessário ter instalado:

* Node.js;
* npm;
* Git, caso o projeto seja clonado do GitHub.

---

## 🚀 Instalação

Clone o repositório:

```bash
git clone https://github.com/cristiermc/pokedex-by-cristec.git
```

Entre na pasta do projeto:

```bash
cd pokedex-by-cristec
```

Instale as dependências:

```bash
npm install
```

---

## ▶️ Execução

### Modo de desenvolvimento

Para executar diretamente os arquivos TypeScript:

```bash
npm run dev
```

Na inicialização, a aplicação verifica a existência do arquivo `pc_box.json`.

Caso o arquivo ainda não exista, ele é criado automaticamente com um array vazio:

```json
[]
```

Se o arquivo já existir, seu conteúdo é carregado para o catálogo antes da execução do fluxo principal.

### Compilação

Para compilar o projeto TypeScript:

```bash
npm run build
```

### Execução da versão compilada

Depois da compilação:

```bash
npm start
```

---

## 📜 Scripts disponíveis

| Script          | Descrição                            |
| --------------- | ------------------------------------ |
| `npm run dev`   | Executa a aplicação utilizando TSX   |
| `npm run build` | Compila o TypeScript para JavaScript |
| `npm start`     | Executa a aplicação compilada        |

---

## 🏗️ Arquitetura do projeto

O projeto foi organizado em camadas para evitar a concentração de toda a lógica em um único arquivo.

```text
pokedex-by-cristec/
│
├── src/
│   ├── main.ts
│   │
│   ├── controllers/
│   │   └── TerminalController.ts
│   │
│   ├── models/
│   │   └── Pokemon.ts
│   │
│   ├── services/
│   │   ├── BoxService.ts
│   │   └── PokeApiService.ts
│   │
│   └── utils/
│
├── pc_box.json
├── dist/
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

### Responsabilidade das camadas

#### `src/models`

Contém os contratos de dados utilizados pela aplicação.

**`Pokemon.ts`**

Define a interface `Pokemon`:

```ts
export interface Pokemon {
    id: number;
    name: string;
    types: string[];
    stats: {
        hp: number;
        attack: number;
        defense: number;
    };
    height: number;
    weight: number;
}
```

A interface representa o Pokémon simplificado utilizado internamente pela aplicação.

Os atributos `stats` contêm somente os três status solicitados pelo projeto:

* HP;
* Attack;
* Defense.

---

#### `src/services/PokeApiService.ts`

Responsável pela integração com a PokeAPI.

A classe `PokeApiService`:

* recebe o nome do Pokémon;
* realiza a requisição utilizando `fetch`;
* utiliza `async/await`;
* verifica se a resposta foi bem-sucedida;
* transforma os dados recebidos;
* extrai os tipos por meio de `type.name`;
* extrai HP, Attack e Defense por meio de `stat.name` e `base_stat`;
* obtém `height` e `weight`;
* retorna um objeto compatível com a interface `Pokemon`.

Também existe uma interface interna para representar somente os campos necessários da resposta da API.

---

#### `src/services/BoxService.ts`

Responsável pelo catálogo local e sua persistência em arquivo JSON.

A classe `BoxService` possui:

* um array privado de Pokémon;
* método `inicializar()`;
* método `adicionar()`;
* método `listar()`;
* método `remover()`.

O método `inicializar()`:

1. verifica se o arquivo `pc_box.json` existe;
2. cria o arquivo com `[]` caso ele não exista;
3. lê o conteúdo do arquivo;
4. carrega os Pokémon para o catálogo em memória.

O método `adicionar()` verifica se o Pokémon já está cadastrado pelo ID antes de inseri-lo e salva o catálogo no arquivo.

O método `remover()` remove o Pokémon pelo ID e salva novamente o catálogo.

O método `listar()` retorna os Pokémon atualmente carregados no catálogo.

---

#### `pc_box.json`

Arquivo utilizado para persistência local do catálogo de Pokémon.

O arquivo é inicializado com:

```json
[]
```

Durante a execução, os Pokémon adicionados são armazenados nesse arquivo.

Exemplo:

```json
[
  {
    "id": 4,
    "name": "charmander",
    "types": [
      "fire"
    ],
    "stats": {
      "hp": 39,
      "attack": 52,
      "defense": 43
    },
    "height": 6,
    "weight": 85
  }
]
```

A aplicação não utiliza banco de dados para essa funcionalidade.

---

#### `src/controllers/TerminalController.ts`

Responsável por orquestrar o fluxo apresentado no terminal.

O controller utiliza os serviços recebidos por injeção de dependências e apresenta os resultados da execução.

Também contém o método responsável pela exibição dos dados de cada Pokémon, incluindo:

* ID;
* nome;
* tipos;
* HP;
* Attack;
* Defense;
* altura;
* peso.

---

#### `src/main.ts`

É o ponto de entrada da aplicação.

Nesse arquivo são criadas as instâncias dos serviços:

```ts
const pokeApiService = new PokeApiService();
const boxService = new BoxService();
```

Antes da execução do controller, o catálogo é inicializado:

```ts
await boxService.inicializar();
```

Depois, as dependências são injetadas no `TerminalController`:

```ts
const terminalController = new TerminalController(
    pokeApiService,
    boxService
);
```

Por fim, a execução do fluxo é iniciada.

---

## 🔄 Fluxo da aplicação

O fluxo demonstrado atualmente é:

```text
Início
  │
  ▼
Inicializar catálogo
  │
  ├── pc_box.json existe?
  │       │
  │       ├── Não → criar arquivo com []
  │       │
  │       └── Sim → carregar catálogo
  │
  ▼
Buscar Pikachu na PokeAPI
  │
  ▼
Adicionar ao catálogo
  │
  ▼
Persistir catálogo
  │
  ▼
Buscar Charmander na PokeAPI
  │
  ▼
Adicionar ao catálogo
  │
  ▼
Persistir catálogo
  │
  ▼
Tentar adicionar Pikachu novamente
  │
  ▼
Bloquear duplicidade
  │
  ▼
Buscar Pokémon inexistente
  │
  ▼
Tratar erro
  │
  ▼
Listar catálogo
  │
  ▼
Remover Pokémon de ID 25
  │
  ▼
Persistir catálogo
  │
  ▼
Listar catálogo novamente
  │
  ▼
Fim
```

---

## ✅ Funcionalidades implementadas

### Busca de Pokémon

A aplicação consulta a PokeAPI utilizando o nome do Pokémon.

Exemplo:

```text
pikachu
```

Os dados retornados são transformados para o modelo utilizado pela aplicação:

```text
#25 - pikachu | Tipos: electric | HP: 35 | Attack: 55 | Defense: 40 | Altura: 4 | Peso: 60
```

---

### Tratamento de Pokémon inexistente

Quando a API retorna uma resposta de erro, o serviço lança uma exceção que é tratada pelo fluxo da aplicação.

Exemplo:

```text
[ERRO] Pokémon não encontrado
```

---

### Adição ao catálogo

Pokémon encontrados podem ser adicionados ao catálogo local.

Exemplo:

```text
[OK] Pikachu adicionado ao catálogo.
[OK] Charmander adicionado ao catálogo.
```

Após a inclusão, o catálogo é persistido no arquivo `pc_box.json`.

---

### Prevenção de duplicidade

O catálogo verifica o ID do Pokémon antes de realizar a inclusão.

Ao tentar adicionar Pikachu novamente:

```text
[AVISO] Pikachu já está no catálogo.
```

O Pokémon não é adicionado novamente ao catálogo.

---

### Persistência do catálogo

O catálogo é armazenado no arquivo `pc_box.json`.

A aplicação carrega o conteúdo existente durante a inicialização e atualiza o arquivo após operações de inclusão ou remoção.

Isso permite que os Pokémon cadastrados permaneçam disponíveis após o encerramento da execução.

---

### Listagem

Os Pokémon presentes no catálogo são exibidos no terminal:

```text
Pokémon no catálogo:
#25 - pikachu | Tipos: electric | HP: 35 | Attack: 55 | Defense: 40 | Altura: 4 | Peso: 60
#4 - charmander | Tipos: fire | HP: 39 | Attack: 52 | Defense: 43 | Altura: 6 | Peso: 85
```

---

### Remoção por ID

O Pokémon pode ser removido utilizando seu ID.

No fluxo demonstrado, o Pokémon de ID `25` é removido:

```text
[OK] Pokémon removido do catálogo.
```

Depois da remoção:

```text
Catálogo após remoção:
#4 - charmander | Tipos: fire | HP: 39 | Attack: 52 | Defense: 43 | Altura: 6 | Peso: 85
```

A alteração também é persistida no `pc_box.json`.

---

## 🔢 Métodos de array utilizados

O projeto utiliza pelo menos três métodos de array, conforme solicitado no mini-projeto.

### `map()`

Utilizado em `PokeApiService.ts` para transformar os tipos retornados pela PokeAPI:

```ts
types: dados.types.map((item) => item.type.name)
```

### `some()`

Utilizado em `BoxService.ts` para verificar se um Pokémon já existe no catálogo:

```ts
const jaExiste = this.catalogo.some(
    (item) => item.id === pokemon.id
);
```

### `forEach()`

Utilizado em `TerminalController.ts` para percorrer e exibir os Pokémon do catálogo:

```ts
catalogo.forEach((pokemon) => {
    this.exibirPokemon(pokemon);
});
```

Dessa forma, o projeto demonstra o uso de três métodos diferentes de array:

```text
map()
some()
forEach()
```

---

## 🧩 Tipagem e TypeScript

O projeto utiliza tipagem explícita em:

* interfaces;
* propriedades;
* parâmetros;
* retornos de métodos;
* Promises;
* arrays;
* objetos retornados pela API.

Exemplo de retorno tipado:

```ts
async buscarPokemon(nome: string): Promise<Pokemon>
```

A configuração do TypeScript utiliza `strict: true` no `tsconfig.json`.

---

## ⚡ Programação assíncrona

A consulta à PokeAPI e as operações de persistência do catálogo são realizadas de forma assíncrona utilizando:

* `fetch`;
* `Promise`;
* `async`;
* `await`;
* `try/catch`.

A leitura e escrita do arquivo `pc_box.json` utilizam as APIs assíncronas do Node.js.

---

## 💉 Injeção de dependências

O `TerminalController` recebe suas dependências pelo construtor:

```ts
constructor(
    private readonly pokeApiService: PokeApiService,
    private readonly boxService: BoxService
) {}
```

As instâncias são criadas no `main.ts` e posteriormente injetadas no controller.

Essa abordagem mantém as responsabilidades separadas e evita que o controller precise criar diretamente os serviços que utiliza.

---

## 🧪 Exemplo de execução

Com:

```bash
npm run dev
```

uma execução esperada do projeto, partindo de um `pc_box.json` inicializado com `[]`, é:

```text
[OK] Pikachu adicionado ao catálogo.
[OK] Charmander adicionado ao catálogo.
[AVISO] Pikachu já está no catálogo.
[ERRO] Pokémon não encontrado

Pokémon no catálogo:
#25 - pikachu | Tipos: electric | HP: 35 | Attack: 55 | Defense: 40 | Altura: 4 | Peso: 60
#4 - charmander | Tipos: fire | HP: 39 | Attack: 52 | Defense: 43 | Altura: 6 | Peso: 85
[OK] Pokémon removido do catálogo.

Catálogo após remoção:
#4 - charmander | Tipos: fire | HP: 39 | Attack: 52 | Defense: 43 | Altura: 6 | Peso: 85
```

Esse fluxo demonstra:

1. inicialização do catálogo;
2. busca de Pikachu;
3. adição de Pikachu;
4. persistência do catálogo;
5. busca de Charmander;
6. adição de Charmander;
7. tentativa de duplicação de Pikachu;
8. tratamento de Pokémon inexistente;
9. listagem do catálogo;
10. remoção do Pokémon de ID 25;
11. persistência após a remoção;
12. nova listagem do catálogo.

Após essa execução, o `pc_box.json` contém o Pokémon que permaneceu no catálogo.

---

## 📊 Kanban / GitHub Projects

O planejamento e acompanhamento das atividades do projeto estão organizados no GitHub Projects:

[GitHub Projects — Pokédex TypeScript Lite](https://github.com/users/cristiermc/projects/2)

---

## 🌿 Versionamento

O projeto utiliza Git e GitHub para controle de versão.

Repositório:

[GitHub — pokedex-by-cristec](https://github.com/cristiermc/pokedex-by-cristec)

A implementação funcional validada está na branch:

```text
feat/pokedex
```

O commit que consolida as alterações de persistência e os novos atributos dos Pokémon é:

```text
d402fd2 feat: persist pokemon catalog and add stats
```

A documentação deste projeto está sendo mantida na branch:

```text
docs
```

A branch `docs` foi criada a partir da implementação validada da `feat/pokedex`.

---

## 📁 Estado atual do projeto

O catálogo utiliza o arquivo `pc_box.json` para persistência local.

O arquivo é inicializado com um array vazio:

```json
[]
```

Caso o arquivo não exista, a aplicação o cria automaticamente durante a inicialização.

Os Pokémon adicionados são armazenados no arquivo e carregados novamente quando a aplicação é executada.

O projeto não utiliza:

* PostgreSQL;
* banco de dados;
* Express;
* NestJS;
* Fastify.

Essas tecnologias não são necessárias para o escopo atual do mini-projeto.

---

## 🎥 Entrega em vídeo

O curso estabelece a apresentação do projeto em vídeo como parte da entrega do mini-projeto.

O vídeo deve apresentar o funcionamento da aplicação e demonstrar os principais requisitos implementados.

> O vídeo é um requisito da entrega acadêmica. A documentação não afirma que essa etapa já foi entregue.

---

## 🎯 Requisitos funcionais contemplados

| Requisito                              | Implementação                                         |
| -------------------------------------- | ----------------------------------------------------- |
| RF01 — Configurar Node.js e TypeScript | `package.json` e `tsconfig.json`                      |
| RF02 — Interface para Pokémon          | `models/Pokemon.ts`                                   |
| RF03 — Interface para retorno da API   | `PokeApiService.ts`                                   |
| RF04 — Buscar Pokémon na PokeAPI       | `PokeApiService.ts`                                   |
| RF05 — Tratar Pokémon inexistente      | `PokeApiService.ts` + `TerminalController.ts`         |
| RF06 — Mapear retorno da API           | `PokeApiService.ts`                                   |
| RF07 — Catálogo local                  | `BoxService.ts` + `pc_box.json`                       |
| RF08 — Adicionar Pokémon               | `BoxService.ts`                                       |
| RF09 — Listar Pokémon                  | `BoxService.ts` + `TerminalController.ts`             |
| RF10 — Remover por ID                  | `BoxService.ts`                                       |
| RF11 — Métodos de array                | `map()`, `some()` e `forEach()`                       |
| RF12 — Classe simples                  | `PokeApiService`, `BoxService` e `TerminalController` |
| RF13 — Demonstrar fluxo                | `TerminalController.ts` iniciado pelo `main.ts`       |

---

## 📚 Aprendizados praticados

Durante o desenvolvimento foram praticados:

* Node.js;
* TypeScript;
* interfaces;
* classes;
* encapsulamento;
* modificadores de acesso;
* tipagem de parâmetros;
* tipagem de retornos;
* arrays;
* objetos;
* JSON;
* leitura e escrita de arquivos;
* arrow functions;
* métodos de array;
* callbacks;
* Promises;
* `async/await`;
* `try/catch`;
* `fetch`;
* consumo de API REST;
* transformação de dados;
* modularização;
* separação de responsabilidades;
* injeção de dependências;
* Git;
* GitHub;
* GitHub Projects.

---

## 👨‍💻 Autor

**Cristier Machado Cittadin**

Projeto desenvolvido para fins acadêmicos no curso de Fundamentos para Back-end: JavaScript, TypeScript.
