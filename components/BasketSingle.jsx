import {
  Typography,
  List,
  Card,
  CardContent,
  CardActions,
  IconButton,
  DeleteIcon,
  Box,
  ListItem
} from "@/components/mui";

const BasketSingle = ({
  basket: { _id, owner, items } = {},
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
          {items.map((items) => (
        <ListItem key={items._id} component="li">
       <Typography component="dd">
          Item: {items}
          </Typography>
        </ListItem>
      ))}
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

export default BasketSingle;