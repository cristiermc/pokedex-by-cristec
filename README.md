# Pokédex TypeScript Lite

Aplicação de terminal desenvolvida em **Node.js + TypeScript** para consultar informações de Pokémon na **PokeAPI**, transformar os dados recebidos em uma estrutura simplificada e manter um catálogo de Pokémon durante a execução do programa.

O projeto foi desenvolvido como mini-projeto avaliativo do curso **Fundamentos para Back-end: JavaScript, TypeScript e PostgreSQL**, com foco na prática de TypeScript, consumo de API, programação assíncrona, classes, interfaces, métodos de array, modularização e organização do código.

---

## 📌 Objetivo

Desenvolver uma aplicação back-end simples executada pelo terminal capaz de:

* consultar Pokémon na PokeAPI;
* tratar Pokémon inexistentes;
* transformar a resposta da API em um objeto simplificado;
* adicionar Pokémon a um catálogo local em memória;
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
* **Git** — controle de versão;
* **GitHub** — hospedagem do repositório e organização do projeto.

> O projeto não utiliza banco de dados. O catálogo é mantido em memória durante a execução da aplicação.

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
|   ├── main.ts
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
├── dist/
│
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
    height: number;
    weight: number;
}
```

A interface representa o Pokémon simplificado utilizado internamente pela aplicação.

---

#### `src/services/PokeApiService.ts`

Responsável pela integração com a PokeAPI.

A classe `PokeApiService`:

* recebe o nome do Pokémon;
* realiza a requisição utilizando `fetch`;
* utiliza `async/await`;
* verifica se a resposta foi bem-sucedida;
* transforma os dados recebidos;
* retorna um objeto compatível com a interface `Pokemon`.

Também existe uma interface interna para representar somente os campos necessários da resposta da API.

---

#### `src/services/BoxService.ts`

Responsável pelo catálogo local em memória.

A classe `BoxService` possui:

* um array privado de Pokémon;
* método `adicionar()`;
* método `listar()`;
* método `remover()`.

O método `adicionar()` verifica se o Pokémon já está cadastrado antes de inseri-lo.

---

#### `src/controllers/TerminalController.ts`

Responsável por orquestrar o fluxo apresentado no terminal.

O controller utiliza os serviços recebidos por injeção de dependências e apresenta os resultados da execução.

Também contém o método responsável pela exibição dos dados de cada Pokémon.

---

#### `src/main.ts`

É o ponto de entrada da aplicação.

Nesse arquivo são criadas as instâncias dos serviços:

```ts
const pokeApiService = new PokeApiService();
const boxService = new BoxService();
```

Depois, essas dependências são injetadas no `TerminalController`:

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
Buscar Pikachu na PokeAPI
  │
  ▼
Adicionar ao catálogo
  │
  ▼
Buscar Charmander na PokeAPI
  │
  ▼
Adicionar ao catálogo
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

Resultado simplificado:

```text
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60
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

Pokémon encontrados podem ser adicionados ao catálogo em memória.

Exemplo:

```text
[OK] Pikachu adicionado ao catálogo.
[OK] Charmander adicionado ao catálogo.
```

---

### Prevenção de duplicidade

O catálogo verifica o ID do Pokémon antes de realizar a inclusão.

Ao tentar adicionar Pikachu novamente:

```text
[AVISO] Pikachu já está no catálogo.
```

---

### Listagem

Os Pokémon presentes no catálogo são exibidos no terminal:

```text
Pokémon no catálogo:
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85
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
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85
```

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

A consulta à PokeAPI é realizada de forma assíncrona utilizando:

* `fetch`;
* `Promise`;
* `async`;
* `await`;
* `try/catch`.

Isso permite realizar a comunicação com a API sem utilizar chamadas síncronas.

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

uma execução esperada do projeto é:

```text
[OK] Pikachu adicionado ao catálogo.
[OK] Charmander adicionado ao catálogo.
[AVISO] Pikachu já está no catálogo.
[ERRO] Pokémon não encontrado

Pokémon no catálogo:
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85
[OK] Pokémon removido do catálogo.

Catálogo após remoção:
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85
```

Esse fluxo demonstra:

1. busca de Pikachu;
2. adição de Pikachu;
3. busca de Charmander;
4. adição de Charmander;
5. tentativa de duplicação de Pikachu;
6. tratamento de Pokémon inexistente;
7. listagem do catálogo;
8. remoção do Pokémon de ID 25;
9. nova listagem do catálogo.

---

## 📊 Kanban / GitHub Projects

O planejamento e acompanhamento das atividades do projeto estão organizados no GitHub Projects:

[GitHub Projects — Pokédex TypeScript Lite](https://github.com/users/cristiermc/projects/2)

---

## 🌿 Versionamento

O projeto utiliza Git e GitHub para controle de versão.

Repositório:

[GitHub — pokedex-by-cristec](https://github.com/cristiermc/pokedex-by-cristec)

A implementação atual está sendo desenvolvida na branch:

```text
feat/pokedex
```

---

## 📁 Estado atual do projeto

O catálogo atualmente funciona **em memória**, durante a execução da aplicação.

Os Pokémon adicionados não são persistidos em banco de dados ou arquivo após o encerramento do programa.

O projeto não utiliza:

* PostgreSQL;
* banco de dados;
* Express;
* NestJS;
* Fastify.

Essas tecnologias não são necessárias para o escopo atual do mini-projeto.

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
| RF07 — Catálogo local em memória       | `BoxService.ts`                                       |
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

Projeto desenvolvido para fins acadêmicos no curso de Fundamentos para Back-end: JavaScript, TypeScript e PostgreSQL.
