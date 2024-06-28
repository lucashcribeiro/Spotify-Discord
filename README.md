# Projeto Next.js com TypeScript e Tailwind CSS

## Descrição

Este é um modelo de aplicação inspirado no Spotify, desenvolvido com Next.js, TypeScript e Tailwind CSS, utilizando Yarn como gerenciador de pacotes. A aplicação integra com a API do Spotify, necessitando de credenciais específicas que devem ser configuradas em um arquivo `.env`.

## Imagem da Aplicação

![Imagem da Aplicação1](/public/Preview1.png)

![Imagem da Aplicação2](/public/Preview2.png)

## Passos para Rodar a Aplicação

1. **Clonar o Repositório:**

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instalar Dependências:**

   ```bash
   yarn install
   ```

3. **Configurar Variáveis de Ambiente:**

   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```env
   NEXT_PUBLIC_SPOTIFY_CLIENT_ID=seu_client_id
   NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=seu_client_secret
   ```

   Obtenha esses valores no [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).

4. **Rodar a Aplicação Localmente:**

   ```bash
   yarn dev
   ```

   A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Utilizando Docker

Este projeto inclui um arquivo Docker para facilitar a implantação.

1. **Construir a Imagem Docker:**

   ```bash
   docker build -t nome-da-imagem .
   ```

2. **Rodar o Contêiner Docker:**

   ```bash
   docker run -p 3000:3000 --env-file .env nome-da-imagem
   ```

   A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Imagem do Docker

![Imagem do Docker](/public/Docker.png)

---

Se você tiver alguma dúvida ou encontrar algum problema, sinta-se à vontade para abrir uma issue ou entrar em contato.
