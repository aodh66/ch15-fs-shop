import Link from "next/link";
import {
  Typography,
  List,
  Card,
  CardContent,
  CardActions,
  IconButton,
  DeleteIcon,
  Box,
} from "@/components/mui";

const OrderDisplay = ({
  order: { _id, owner, receiptURL } = {},
  deleteHandler = () => {
    console.log("no delete handler supplied");
  },
  canRemove = false,
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
          <Typography component="dd">
        Owner: {owner}
            
          </Typography>
          <Link href={receiptURL} sx={{ fontWeight: "bold" }}>
          Receipt URL: {receiptURL}
          </Link>
        </List>
      </CardContent>
      <CardActions sx={{ display: "grid", placeItems: "center" }}>
        <Box>
          {canRemove && (
            <IconButton aria-label="delete" onClick={() => deleteHandler(_id)}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default OrderDisplay;