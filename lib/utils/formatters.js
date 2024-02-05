import { inspect } from "util";
const hyphenate = (str) => str.replaceAll(" ", "-");
const slugify = (str, id) => `${hyphenate(str).toLowerCase()}-${id}`;
const log = (label, target) =>
  console.log(
    label,
    inspect(target, {
      showHidden: true,
      colors: true,
      depth: null,
    })
  );
  const formatter = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });
const formatPrice = (p) => {
  return formatter.format(p);
}
export { hyphenate, slugify, log, formatPrice };