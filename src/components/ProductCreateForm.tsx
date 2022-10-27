import {
  Alert,
  Button,
  Label,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useCreateProductMutation } from "../hooks/useCreateProductMutation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateProductSchema,
  createProductSchemaObject,
} from "../schemas/create-product";

export const ProductCreateForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProductSchema>({
    resolver: yupResolver(createProductSchemaObject),
  });

  const {
    mutate,
    isLoading,
    isError,
    isSuccess,
    data: product,
    error: mutationError,
  } = useCreateProductMutation();

  const onSubmit = handleSubmit((product) => {
    mutate(product, { onSuccess: () => reset() });
  });

  return (
    <form className="flex flex-col w-full" onSubmit={onSubmit}>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="title"
            value="Title"
            {...(errors.title && { color: "failure" })}
          />
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="Product title"
          {...(errors.title && { color: "failure" })}
          {...register("title")}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <Textarea
          id="description"
          placeholder="Description"
          {...register("description")}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="price"
            value="Price"
            {...(errors.price && { color: "failure" })}
          />
        </div>
        <TextInput
          id="price"
          type="text"
          placeholder="00.00"
          {...(errors.price && { color: "failure" })}
          {...register("price")}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="stocks"
            value="Stocks"
            {...(errors.stocks && { color: "failure" })}
          />
        </div>
        <TextInput
          id="stocks"
          type="number"
          placeholder="0"
          {...(errors.stocks && { color: "failure" })}
          {...register("stocks")}
        />
      </div>

      {isSuccess && (
        <Alert color={"success"}>
          <span className="font-medium">Success! </span>
          <span>Product &quot;{product?.title}&quot; created.</span>
        </Alert>
      )}

      {isError && (
        <Alert color={"failure"}>
          <span className="font-medium">Error! </span>
          <span>{mutationError as string}</span>
        </Alert>
      )}

      <div className="mt-2"></div>

      <Button type="submit" disabled={isLoading}>
        {isLoading && (
          <div className="mr-3">
            <Spinner size="sm" light={true} />
          </div>
        )}
        Create
      </Button>
    </form>
  );
};
