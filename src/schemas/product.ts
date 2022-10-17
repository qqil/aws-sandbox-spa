import * as Yup from "yup";

export const productSchema = Yup.object({
  id: Yup.string().required(),
  title: Yup.string().required(),
  description: Yup.string().required().default(""),
  price: Yup.number().min(0).required(),
  quantity: Yup.number().min(0).required().default(0),
});

export const productArraySchema = Yup.array(productSchema);
export type Product = Yup.InferType<typeof productSchema>;
