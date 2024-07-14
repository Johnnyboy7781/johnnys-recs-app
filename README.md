---
title: SSR Angular 17 + TypeScript
description: The default Server Side Rendered Angular TS starter
tags:
  - Node
  - Angular 17
  - TypeScript
---

# SSR Angular + TypeScript

This project was originally generated with [`ng new my-app`](https://angular.io/cli#basic-workflow) and selecting `Yes` when asked to use SSR.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/A5t142)

## ✨ Features

- SSR Angular 17 + TypeScript

## 💁‍♀️ Local Development

- Install required dependencies with `npm install`
- Run `npm run dev` for a local development server
- Navigate to `http://127.0.0.1:4200/`. The application will automatically reload if you change any of the source files.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## ❓ What was changed from the default Angular 17 Server Side Rendered example?

- The `start` script was renamed to `dev` since it starts a local development server.
- The `serve:ssr:my-app` script was renamed to `start` since it starts the production server.

Railway will automatically use the `build` and `start` scripts from the package.json.

Angular's server side rendered server will listen on the host 0.0.0.0 and the PORT environment variable that Railway expects the app to.

Thats all the changes needed to deploy a server side rendered Angular 17 app on Railway!
