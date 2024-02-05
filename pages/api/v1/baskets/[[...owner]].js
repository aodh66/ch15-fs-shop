import nc from "next-connect";
import {
  getSession,
} from "@auth0/nextjs-auth0";

import {
  handleUnauthorisedAPICall,
  checkPermissions,
  checkRole,
} from "@/lib/api-functions/server/utils";

import permissions from "@/lib/api-functions/server/permissions.js";

const {
  identifier,
  roles: { admin },
  permissions: {
    baskets: {
      create: createBaskets,
      read: readBaskets,
      update: updateBaskets,
      remove: removeBaskets,
    },
  },
} = permissions;

import {
  updateBasket,
  removeBasket,
  removeItemFromBasket,
  getBaskets,
  getOwnBasket,
  addBasket,
  addToUserBasket
} from "@/lib/api-functions/server/baskets/controllers";

const baseRoute = "/api/v1/baskets/:owner?/:item?";

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
  try {
    const session = await getSession(req, res);
    req.user = session.user;
    next();
  } catch (err) {
    return handleUnauthorisedAPICall(res);
  }
})
  .get(baseRoute, async (req, res) => {
    const {owner} = req.params;
    if(owner === 'own') {
      return getOwnBasket(req, res);
    }
    const isAdmin = checkRole(req.user, identifier, admin);

    if(!owner && !isAdmin) {
      return handleUnauthorisedAPICall(res);
    }
    getBaskets(req, res);
  })
  .post(baseRoute, async (req, res) => {
    const {owner} = req.params;
    if(owner === 'own') {
      return addToUserBasket(req, res);
    }
    if (!checkPermissions(req.user, identifier, createBaskets)) {
      return handleUnauthorisedAPICall(res);
    }
    addBasket(req, res);
  })
  .put(baseRoute, async (req, res) => {
    // const {owner} = req.params;
    // if(owner === 'own') {
    //   return getOwnBasket(req, res);
    // }
    if (!checkPermissions(req.user, identifier, updateBaskets)) {
      return handleUnauthorisedAPICall(res);
    }
    updateBasket(req, res);
  })
  .delete(baseRoute, async (req, res) => {
    const {owner} = req.params;
    if(owner === 'own') {
      return removeItemFromBasket(req, res);
    }
    if (!checkPermissions(req.user, identifier, removeBaskets)) {
      return handleUnauthorisedAPICall(res);
    }
    removeBasket(req, res);
  });

export default handler;