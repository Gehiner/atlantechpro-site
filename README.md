# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Static deployment (Hostinger Web Premium)

The site can be exported as plain static files (no Node.js server in production).

```sh
bun install
bun run build:static    # prerenders every page into dist/client and verifies it
bun run preview:static  # http://127.0.0.1:4173
bun run verify:static   # checks every sitemap URL, assets and 404 handling
```

Upload the **contents** of `dist/client/` to `public_html`. Details: [docs/hostinger-static-deploy.md](docs/hostinger-static-deploy.md).

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
