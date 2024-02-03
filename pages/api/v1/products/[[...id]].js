import nc from "next-connect";
import {
  getSession,
} from "@auth0/nextjs-auth0";

import {
  handleUnauthorisedAPICall,
  checkPermissions,
} from "@/lib/api-functions/server/utils";

import permissions from "@/lib/api-functions/server/permissions.js";

const {
  identifier,
  permissions: {
    products: {
      create: createProducts,
      read: readProducts,
      update: updateProducts,
      remove: removeProducts,
    },
  },
} = permissions;

import {
  updateProduct,
  removeProduct,
  getProducts,
  addProduct,
} from "@/lib/api-functions/server/products/controllers";

const baseRoute = "/api/v1/products/:id?";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Internal Server Error");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Not Found");
  },
  attachParams: true,
})
.use(async (req, res, next) => {
  if (req.method === "GET") {
    return next();
  }
  try {
    const session = await getSession(req, res);
    req.user = session.user;
    // console.log(session);
    console.log(req.user);
    next();
  } catch (err) {
    console.log('err', err);
    return handleUnauthorisedAPICall(res);
  }
})
  .get(baseRoute, async (req, res) => {
    getProducts(req, res);
  })
  .post(baseRoute, async (req, res) => {
    if (!checkPermissions(req.user, identifier, createProducts)) {
      return handleUnauthorisedAPICall(res);
    }
    addProduct(req, res);
  })
  .put(baseRoute, async (req, res) => {
    if (!checkPermissions(req.user, identifier, updateProducts)) {
      return handleUnauthorisedAPICall(res);
    }
    updateProduct(req, res);
  })
  .delete(baseRoute, async (req, res) => {
    if (!checkPermissions(req.user, identifier, removeProducts)) {
      return handleUnauthorisedAPICall(res);
    }
    removeProduct(req, res);
  });

export default handler;