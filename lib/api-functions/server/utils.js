const checkPermissions = (user, API, permission) => {
    // console.log(user, API, permission);
    const permissions = user[`${API}/permissions`];
    console.log("permission", permission);
    // console.log("test", user[`${API}/permissions`]);
    return permissions?.includes?.(permission);
  };
  
  const checkRole = (user, API, role) => {
    console.log(user, API, role);
    const roles = user[`${API}/roles`];
    console.log("roles", roles, `${API}/roles`);
    return roles?.includes?.(role);
  };
  
  const handleUnauthorisedAPICall = (res) => {
    return res.status(401).end("Unauthorised");
  };
  
  export { checkPermissions, handleUnauthorisedAPICall, checkRole };