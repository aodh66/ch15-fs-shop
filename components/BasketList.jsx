import { nanoid } from "nanoid";
import { List, ListItem } from "@/components/mui";
import Product from "@/components/Product";
import Paragraph from "@/components/Paragraph";
import { useUserBasket } from "@/lib/tq/baskets/queries";

const BasketList = ({
  deleteHandler = () => {
    console.log("No deleteHandler supplied");
  },
  headingLevel=1
}) => {
  const { data: basket } = useUserBasket();
  const { items } = basket;
  if (!items.length) return <Paragraph>No items to show</Paragraph>;
  return (
    <List
      component="ol"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(400px,1fr))",
      }}
    >
      {items.map((item) => (
        <ListItem key={nanoid()} component="li">
          <Product
            product={item}
            deleteHandler={deleteHandler}
            headingLevel={headingLevel}
            canBuy={false}
            canUpdate={false}
            canRemove={true}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default BasketList;