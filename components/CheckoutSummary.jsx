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
// import Product from "@/components/Product";
// import Paragraph from "@/components/Paragraph";
import { useUserBasket } from "@/lib/tq/baskets/queries";
import { formatPrice } from "@/lib/utils/formatters";

const CheckoutSummary = () => {
  const { data: basket } = useUserBasket();
  const basketTotal = basket.items.reduce((total, item) => {
    console.log('basketcalc', total, item);
    return add(total, dinero({ amount: item.price, currency: GBP }));
  }, dinero({ amount: 0, currency: GBP }));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Order Details">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map(({ title, price }) => (
            <TableRow
              key={nanoid()}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {title}
              </TableCell>
              <TableCell align="right">
                {formatPrice(
                  toDecimal(dinero({ amount: price, currency: GBP }))
                )}
              </TableCell>
              {/* <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align="right" component="th" scope="row">
              <Typography>Total</Typography>
            </TableCell>
            <TableCell>
              <Typography>{formatPrice(toDecimal(basketTotal))}</Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default CheckoutSummary;