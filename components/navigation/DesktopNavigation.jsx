import React from "react";
import Link from "next/link";
import Image from 'next/image'
import {
  AppBar,
  Box,
  IconButton,
  MenuIcon,
  Toolbar,
  Typography,
  Button,
} from "@/components/mui";
import { useTheme } from "@mui/material/styles";
import { useUser } from '@auth0/nextjs-auth0/client';
import logo from "@/images/shop.svg";

import ShoppingCartDisplay from "@/components/BasketDisplay";

function DesktopNavigation({
  handleDrawerToggle = () =>
    console.log("no handleDrawerToggle function provided"),
}) {
  const theme = useTheme();
  const { user } = useUser();
  const lightTextColor = theme.palette.common.white;
  return (
    <>
      <AppBar component="nav" position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Image
      src={logo}
      width={50}
      height={50}
      alt="Site Logo"
    />
          <Typography
            variant="h6"
            component={Link}
            href={`/`}
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              textDecoration: "none",
              color: lightTextColor,
            }}
          >
            Eclectic Shop
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {user && <ShoppingCartDisplay user={user} />}
            {user && user["https://ch15-fs-shop.vercel.app/admin"] && (
              <Button
              sx={{ color: lightTextColor }}
              component={Link}
              href="/admin"
            >
              Admin
            </Button>
            )}
            <Button
              sx={{ color: lightTextColor }}
              component={Link}
              href="/blog"
            >
              Blog
            </Button>
            <Button
              sx={{ color: lightTextColor }}
              component={Link}
              href="/contact"
            >
              Contact
            </Button>
            {user ? (
              <>
                <Button
                  href="/profile"
                  component={Link}
                  sx={{ color: lightTextColor }}
                >
                  Profile
                </Button>
                <Button
                  href="/api/auth/logout"
                  component={Link}
                  sx={{ color: lightTextColor }}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <Button
                href="/api/auth/login"
                component={Link}
                sx={{ color: lightTextColor }}
              >
                Log In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default DesktopNavigation;
