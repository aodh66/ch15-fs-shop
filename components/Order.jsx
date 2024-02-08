import Image from "next/image";
import Link from "next/link";
// import { dinero, toDecimal } from "dinero.js";
// import { GBP } from '@dinero.js/currencies';
import {
  Typography,
  List,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
  EditIcon,
  DeleteIcon,
  Button,
  Box,
} from "@/components/mui";
import Heading from "@/components/Heading";
import Product from "@/components/Product";
import { ListItem } from "@/components/mui";
// import { slugify, formatPrice } from "@/lib/utils/formatters";

// owner: {
//   type: String, // Auth0 ID
//   required: true,
// },
// items: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
// receiptURL: {
//   type: String,  // Stripe receipt url
//   required: true,
// },

// ! DESCRIPTION PLACEHOLDER, LIKELY REMOVE LATER
const OrderDisplay = ({
  order: { _id, owner, items, receiptURL } = {},
  deleteHandler = () => {
    console.log("no delete handler supplied");
  },
  // addToBasket = (id) => {
  //   console.log("no addToBasket handler supplied", id);
  // },
  headingLevel = 2,
  // canUpdate = false,
  canRemove = false,
  // canBuy=false
}) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <List
          component="dl"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
          }}
          >
          <Typography component="dt" sx={{ textAlign: "left", fontWeight: "bold" }}>
            ID: {_id}
          </Typography>
          {/* <Typography component="dt" sx={{ textAlign: "left" }}>
          Items: {items}
        </Typography> */}
          <Typography component="dd">
        Owner: {owner}
            
          </Typography>
          <Link href={receiptURL} sx={{ fontWeight: "bold" }}>
          Receipt URL: {receiptURL}
          </Link>
          {/* ! PLACEHOLDER DESCRIPTION */}
        </List>
      </CardContent>
      <CardActions sx={{ display: "grid", placeItems: "center" }}>
        <Box>
          {/* <Button href={`/orders/${slugify(title, _id)}`} component={Link}>
            View
          </Button> */}
          {/* {canUpdate && (
            <IconButton
              aria-label="update"
              component={Link}
              href={`/admin/orders/update/${_id}`}
            >
              <EditIcon />
            </IconButton>
          )} */}
          {canRemove && (
            <IconButton aria-label="delete" onClick={() => deleteHandler(_id)}>
              <DeleteIcon />
            </IconButton>
          )}
          {/* {canBuy && (
            <Button onClick={addToBasket}>
              Add to Basket
            </Button>
          )} */}
        </Box>
      </CardActions>
    </Card>
  );
};

export default OrderDisplay;