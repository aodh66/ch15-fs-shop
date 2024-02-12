import { nanoid } from "nanoid";
import { dinero, add, toDecimal } from "dinero.js";
import { GBP } from "@dinero.js/currencies";
import {
  Paper,
  // List,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  Typography,
} from "@/components/mui";
import { useUserBasket } from "@/lib/tq/baskets/queries";
import { formatPrice } from "@/lib/utils/formatters";

const CheckoutSummary = () => {
  const { data: basket } = useUserBasket();
  const basketTotal = basket.items.reduce((total, item) => {
    console.log('basketcalc', total, item);
    return add(total, dinero({ amount: item.price, currency: GBP }));
  }, dinero({ amount: 0, currency: GBP }));

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "hsla(90, 0%, 0%, 0.5)" }}>
      <Table sx={{ minWidth: 650 }} aria-label="Order Details">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Name</TableCell>
            <TableCell sx={{ color: "white" }}>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map(({ title, price }) => (
            <TableRow
              key={nanoid()}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ color: "white" }}>
                {title}
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                {formatPrice(
                  toDecimal(dinero({ amount: price, currency: GBP }))
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align="right" component="th" scope="row">
              <Typography sx={{ color: "white" }}>Total</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ color: "white" }}>{formatPrice(toDecimal(basketTotal))}</Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default CheckoutSummary;