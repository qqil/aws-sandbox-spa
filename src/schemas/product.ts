import * as Yup from "yup";

export const productSchema = {
  id: Yup.string().required(),
  title: Yup.string().min(3).required(),
  description: Yup.string().default(""),
  price: Yup.number().min(0).required(),
  stocks: Yup.number().min(0).required(),
};

export const productSchemaObject = Yup.object(productSchema);
export const productArraySchemaObject = Yup.array(productSchemaObject);
export type ProductSchema = Yup.InferType<typeof productSchemaObject>;
export type ProductArraySchema = Yup.InferType<typeof productArraySchemaObject>;
