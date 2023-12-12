import React from "react";
import Link from "next/link";
import {
    Divider,
    List,
    ListItem,
    Drawer,
    ListItemButton,
    ListItemText,
    Box,
    Typography,
} from '@/components/mui'

function MobileNavigation({
  mobileOpen = false,
  handleDrawerToggle = () =>
    console.log("no handleDrawerToggle function provided"),
  drawerWidth = 240,
}) {
    const itemLinkStyles = {
        display: 'block',
        textDecoration: 'none',
        flexGrow: '1',
    }
  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Design Shop
          </Typography>
          <Divider />
          <List>
            <ListItem>
              <Link href={"/"} passHref style={itemLinkStyles}>
                <ListItemButton sx={{ textAlign: "left", width: '100%' }}>
                  <ListItemText primary={"Shop"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link href={"/contact"} passHref style={itemLinkStyles}>
                <ListItemButton sx={{ textAlign: "left", width: '100%' }}>
                  <ListItemText primary={"Contact"} />
                </ListItemButton>
              </Link>
            </ListItem>
            
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default MobileNavigation;
