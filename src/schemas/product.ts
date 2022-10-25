import * as Yup from "yup";

const baseSchema = {
  id: Yup.string().required(),
  title: Yup.string().min(3).required(),
  description: Yup.string().default(""),
  price: Yup.number().min(0).required(),
  stocks: Yup.number().min(0).required(),
};
const { id, ...productSchemaWithoutId } = baseSchema;

export const productSchema = Yup.object(baseSchema);
export const createProductSchema = Yup.object(productSchemaWithoutId);

export const productArraySchema = Yup.array(productSchema);
export type Product = Yup.InferType<typeof productSchema>;
export type CreateProduct = Yup.InferType<typeof createProductSchema>;
