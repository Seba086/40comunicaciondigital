# 40 Comunicación Digital

Landing de 40CD construida con Next.js App Router, TypeScript y Tailwind CSS. La interfaz usa el sistema visual Awesomic: superficies zinc claras, tinta obsidiana, acento Ember, tipografía DM Sans, radios amplios y bordes hairline.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir http://localhost:3000.

## Base de datos en Hostinger

1. Crear una base MySQL y un usuario desde hPanel.
2. Copiar `.env.example` como `.env.local` y completar las credenciales. `.env.local` está ignorado por Git.
3. Ejecutar `database.sql` desde phpMyAdmin.
4. La ruta `POST /api/contact` insertará los formularios en `contact_submissions`.

Para producción en Hostinger Node.js, usar el mismo conjunto de variables de entorno y ejecutar `npm run build` seguido de `npm run start`.

Para enviar las consultas por correo, configurar `CONTACT_SMTP_PASSWORD` en las variables de entorno de la app en Hostinger con una contraseña de aplicación de la cuenta de Google Workspace `nicolas.rielo@40comunicaciondigital.com`. Las consultas se guardan primero en MySQL. Los errores de notificación quedan registrados en los logs de la app.

## Calidad

```bash
npm run lint
npm run build
```

El repositorio local apunta a `git@github.com:Seba086/40comunicaciondigital.git`.
