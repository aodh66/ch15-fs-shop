import Link from "next/link";
import { Badge, IconButton, ShoppingCartIcon } from "@/components/mui";
import { styled } from "@mui/material/styles";

import { useUserBasket } from "@/lib/tq/baskets/queries";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const ShoppingCartDisplay = () => {
  const { data: basket } = useUserBasket();
//   if (!products.length) return <Paragraph>No products to show</Paragraph>;
//   console.log("b", basket, basket?.items?.length);
  return (
    <IconButton aria-label="cart" href="/basket" component={Link}>
      <StyledBadge 
      badgeContent={basket?.items?.length} 
      color="primary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
};

export default ShoppingCartDisplay;