import Link from "next/link";
import { dinero, add, toDecimal } from "dinero.js";
import { GBP } from "@dinero.js/currencies";
import { Button } from "@/components/mui";
import Paragraph from "@/components/Paragraph";
import { useUserBasket } from "@/lib/tq/baskets/queries";
import { formatPrice } from "@/lib/utils/formatters";

const BasketTotal = ({}) => {
  const { data: basket } = useUserBasket();
  const basketTotal = basket.items.reduce((total, item) => {
    console.log(total, item);
    return add(total, dinero({ amount: item.price, currency: GBP }));
  }, dinero({ amount: 0, currency: GBP }));

  return (
    <>
      {basket.items.length ? (
        <>
          <Button component={Link} href="/checkout" variant="contained">
            Checkout
          </Button>
          <Paragraph>Total: {formatPrice(toDecimal(basketTotal))}</Paragraph>
        </>
      ) : null}
    </>
  );
};

export default BasketTotal;