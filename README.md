# Eclectic Shop
Welcome to the Eclectic Shop, a hypothetical SPA fullstack shop project.
The Eclectic Shop has a frontend built on Next.js and Material-UI. MongoDB and Hygraph handles the main and blog database side of things, while Tanstack Query and Axios are used to communicate with it. Stripe handles payments. Nodemailer handles things like emailing customers and last but not least Auth0 is used for authentication.

[Online deployed link](https://ch15-fs-shop.vercel.app/)

## Manual Deployment
Note that for manual deployment, the .env.example file will need to be renamed to .env.local, and your values filled in to connect to Auth0, Hygraph and Stripe.

```bash
pnpm i
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.