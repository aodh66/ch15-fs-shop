
import * as React from "react";
import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import DesktopNavigation from "@/components/navigation/DesktopNavigation";
// import ErrorBoundary from "./debug/ErrorBoundary";

function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MobileNavigation
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
      <DesktopNavigation handleDrawerToggle={handleDrawerToggle} />
    </Box>
  );
}

export default Header;