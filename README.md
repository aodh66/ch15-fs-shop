This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Push RBAC permissions to token
```
const auth0 = require('auth0'); // 4.1.0
// const {inspect} = require('util');
// const map = require('array-map'); // latest
/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {
  const namespaces = ['http://localhost:3000', 'http://localhost:5000', 'https://ch15-fs-shop.vercel.app'];
  // const namespace = 'http://localhost:3000';
    // const namespace = '[http://localhost:3000](http://localhost:3000/)';
    // const namespace = '[http://localhost:3000](http://localhost:3000/)';

  const { user } = event
    console.log(user)

  // if (user[`${namespace}/permissions`]) {
  //   return;
  // }
  // console.log(user)
  const { ManagementClient } = auth0;

  const management = new ManagementClient({
    clientId: event.secrets.client_id,
    clientSecret: event.secrets.client_secret,
    domain: event.secrets.domain
  });

  const params = { id: user.user_id, page: 0, per_page: 50, include_totals: true };

  try {
    const resp = await management.users.getPermissions(params);


    //  console.log('HERE', inspect(resp, { colors: true, depth: -1, showHidden: true }))

    const {
      data: {
        permissions: userPermissions,
      }
    } = resp;

    const permissionsArr = userPermissions.map((permission) => {
      return permission.permission_name;
    });

    for (const namespace of namespaces) {
      api?.idToken?.setCustomClaim?.(`${namespace}/permissions`, permissionsArr);
      api?.accessToken?.setCustomClaim?.(`${namespace}/permissions`, permissionsArr);
    }
  } catch (err) {
    return api.access.deny(err.message);
  }

}
```

### 