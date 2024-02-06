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
// import { slugify, formatPrice } from "@/lib/utils/formatters";

// owner: {
//   type: String, // Auth0 ID
//   required: true,
// },
// items: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
// receiptURL: {
//   type: String,  // Stripe receipt url
//   required: true,
// },

// ! DESCRIPTION PLACEHOLDER, LIKELY REMOVE LATER
const ProductDisplay = ({
  product: { _id, title, image, price, quantity, description } = {},
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
      <CardMedia sx={{ display: "grid", placeItems: "center" }}>
        <Image alt={title} src={image} width="500" height="500" />
      </CardMedia>
      <CardContent>
        <Heading component={`h${headingLevel}`} sx={{ textAlign: "center" }}>
          {title}
        </Heading>
        <List
          component="dl"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1em",
          }}
        >
          <Typography component="dt" sx={{ textAlign: "right" }}>
            Price
          </Typography>
          {/* <Typography component="dd" sx={{ fontWeight: "bold" }}>
            {formatPrice(toDecimal(dinero({ amount: price, currency: GBP})))}
          </Typography> */}
          <Typography component="dt" sx={{ textAlign: "right" }}>
            Quantity
          </Typography>
          <Typography component="dd" sx={{ fontWeight: "bold" }}>
            {quantity} remaining
          </Typography>
          {/* ! PLACEHOLDER DESCRIPTION */}
          <Typography component="dd" sx={{ fontWeight: "bold" }}>
            {description}
          </Typography>
        </List>
      </CardContent>
      <CardActions sx={{ display: "grid", placeItems: "center" }}>
        <Box>
          {/* <Button href={`/products/${slugify(title, _id)}`} component={Link}>
            View
          </Button> */}
          {/* {canUpdate && (
            <IconButton
              aria-label="update"
              component={Link}
              href={`/admin/products/update/${_id}`}
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

export default ProductDisplay;