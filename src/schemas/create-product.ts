import { productSchema } from "./product";
import * as Yup from "yup";

const { id, ...productSchemaWithoutId } = productSchema;

export const createProductSchemaObject = Yup.object(productSchemaWithoutId);
export type CreateProductSchema = Yup.InferType<
  typeof createProductSchemaObject
>;
