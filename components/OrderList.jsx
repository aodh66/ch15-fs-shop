import { useOrders } from "@/lib/tq/orders/queries";
import { List, ListItem } from "@/components/mui";
import Order from "@/components/Order";
import Paragraph from "@/components/Paragraph";

const OrderList = (
    {
  deleteHandler = () => {},
  headingLevel = 2,
}
) => {
  const { data: orders } = useOrders();
  if (!orders.length) return <Paragraph>No orders to show</Paragraph>;
  return (
    <List
      component="ol"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(400px,1fr))",
      }}
    >
      {orders.map((order) => (
        <ListItem key={order._id} component="li">
          <Order
            order={order}
            deleteHandler={deleteHandler}
            headingLevel={headingLevel}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default OrderList;