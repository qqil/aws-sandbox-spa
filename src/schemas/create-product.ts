import { productSchemaObject } from "./product";
import * as Yup from "yup";

const { id, ...productSchemaWithoutId } = productSchemaObject;

export const createProductSchema = Yup.object(productSchemaWithoutId);
export type CreateProduct = Yup.InferType<typeof createProductSchema>;
