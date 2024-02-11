import Image from "next/image";
import Link from "next/link";
import { dinero, toDecimal } from "dinero.js";
import { GBP } from '@dinero.js/currencies';
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
import { slugify, formatPrice } from "@/lib/utils/formatters";

// ! DESCRIPTION PLACEHOLDER, LIKELY REMOVE LATER
const ProductDisplay = ({
  product: { _id, title, image, price, quantity, description } = {},
  deleteHandler = () => {
    console.log("no delete handler supplied");
  },
  addToBasket = (id) => {
    console.log("no addToBasket handler supplied", id);
  },
  headingLevel = 2,
  canUpdate = false,
  canRemove = false,
  canBuy=false
}) => {
  return (
    <Card sx={{ width: "100%", backgroundColor: "hsla(90, 0%, 0%, 0.5)" }}>
      <CardMedia sx={{ display: "grid", placeItems: "center" }}>
        <Image alt={title} src={image} width="500" height="500" />
      </CardMedia>
      <CardContent>
        <Heading component={`h${headingLevel}`} sx={{ textAlign: "center", color: "white" }}>
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
          <Typography component="dt" sx={{ textAlign: "right", color: "white" }}>
            Price
          </Typography>
          <Typography component="dd" sx={{ fontWeight: "bold", color: "white" }}>
            {formatPrice(toDecimal(dinero({ amount: price, currency: GBP})))}
          </Typography>
          <Typography component="dt" sx={{ textAlign: "right", color: "white" }}>
            Quantity
          </Typography>
          <Typography component="dd" sx={{ fontWeight: "bold", color: "white" }}>
            {quantity} remaining
          </Typography>
          <Typography component="dd" sx={{ fontWeight: "bold", color: "white" }}>
            {description}
          </Typography>
        </List>
      </CardContent>
      <CardActions sx={{ display: "grid", placeItems: "center" }}>
        <Box>
          <Button href={`/products/${slugify(title, _id)}`} component={Link} color="secondary">
            View
          </Button>
          {canUpdate && (
            <IconButton
              aria-label="update"
              component={Link}
              href={`/admin/products/update/${_id}`}
            >
              <EditIcon />
            </IconButton>
          )}
          {canRemove && (
            <IconButton aria-label="delete" onClick={() => deleteHandler(_id)}>
              <DeleteIcon />
            </IconButton>
          )}
          {canBuy && (
            <Button onClick={addToBasket} color="secondary">
              Add to Basket
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProductDisplay;