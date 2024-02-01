// import { useUser } from "@auth0/nextjs-auth0/client";
import { useBaskets } from "@/lib/tq/baskets/queries";
// import { useAddToBasket } from "@/lib/tq/baskets/mutations";
import { List, ListItem } from "@/components/mui";
import Basket from "@/components/Basket";
import Paragraph from "@/components/Paragraph";

const BasketList = (
    {
  deleteHandler = () => {},
  headingLevel = 2,
  // canUpdate = false,
  // canRemove = false,
  // canBuy = true,
}
) => {
//   const { user } = useUser();
//   const mutation = useAddToBasket();

  const { data: baskets } = useBaskets();
  if (!baskets.length) return <Paragraph>No baskets to show</Paragraph>;
  return (
    <List
      component="ol"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(400px,1fr))",
      }}
    >
      {baskets.map((basket) => (
        <ListItem key={basket._id} component="li">
          <Basket
            basket={basket}
            deleteHandler={deleteHandler}
            headingLevel={headingLevel}
            // canUpdate={canUpdate}
            // canRemove={canRemove}
            // canBuy={!!user && canBuy}
            // addToBasket={() => mutation.mutate(basket._id)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default BasketList;