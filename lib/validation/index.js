import * as yup from "yup";

// {
//   image: url,
//   title: string,
//   description?: string,
//   price: number,
//   quantity: number
// }

const addProductSchema = yup
  .object({
    image: yup.string().trim().max(300).url().required(),
    title: yup.string().trim().max(100).required(),
    description: yup.string().trim().max(20000).optional(),
    price: yup.number().integer().positive().max(50000).required(),
    quantity: yup.number().integer().positive().max(5000).required(),
  })
  .required();


const updateProductSchema = yup
  .object({
    image: yup.string().trim().min(1).max(300).url().optional(),
    title: yup.string().trim().min(1).max(100).optional(),
    description: yup.string().trim().max(20000).optional(),
    price: yup.number().integer().positive().max(50000).optional(),
    quantity: yup.number().integer().positive().max(5000).optional(),
  })
  .required();

  export {
    addProductSchema,
    updateProductSchema
  }