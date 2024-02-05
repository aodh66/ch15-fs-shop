const settings = Object.freeze({
    identifier: "https://ch15-fs-shop.vercel.app",
    rolesPath: '/roles',
    permissionsPath: '/permissions',
    roles: {
      admin: "Admin Shop"
    },
    permissions: {
      baskets: {
        create: "baskets:create",
        read: "baskets:read",
        update: "baskets:update",
        remove: "baskets:delete",
      },
      orders: {
        create: "orders:create",
        read: "orders:read",
        update: "orders:update",
        remove: "orders:delete",
      },
      products: {
        create: "products:create",
        read: "products:read",
        update: "products:update",
        remove: "products:delete",
      }
    },
});

export default settings;