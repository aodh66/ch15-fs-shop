import { useBaskets } from "@/lib/tq/baskets/queries";
import { List, ListItem } from "@/components/mui";
import BasketSingle from "@/components/BasketSingle";
import Paragraph from "@/components/Paragraph";

const BasketList = (
    {
  deleteHandler = () => {},
  headingLevel = 2,
}
) => {
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
          <BasketSingle
            basket={basket}
            deleteHandler={deleteHandler}
            headingLevel={headingLevel}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default BasketList;