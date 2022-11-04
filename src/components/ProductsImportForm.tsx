import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, FileInput } from "flowbite-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useUploadCSVMutation } from "../hooks/useUploadCSVMutation";
import { UploadCsv, uploadCsvSchema } from "../schemas/upload-csv";

const ProductsImportForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UploadCsv>({
    resolver: yupResolver(uploadCsvSchema),
  });

  const {
    mutate,
    isLoading,
    isError,
    isSuccess,
    error: mutationError,
  } = useUploadCSVMutation();

  const onSubmit = handleSubmit((data) => {
    mutate(data.file[0], { onSuccess: () => reset() });
  });

  const onReset = () => {
    reset();
  };

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={onSubmit}
      onReset={onReset}
    >
      <div>
        <FileInput
          helperText="Products .csv file"
          {...register("file")}
          {...(errors.file && { color: "failure" })}
        />
      </div>

      {isSuccess && (
        <>
          <Alert color={"success"}>
            <span className="font-medium">Success! </span>
            <span>File uploaded.</span>
          </Alert>
          <div className="mb-2"></div>
        </>
      )}

      {isError && (
        <>
          <Alert color={"failure"}>
            <span className="font-medium">Error! </span>
            <span>{mutationError as string}</span>
          </Alert>
          <div className="mb-2"></div>
        </>
      )}

      <div className="flex justify-end gap-x-1">
        <Button type="reset" outline={true} color="gray">
          Reset
        </Button>
        <Button type="submit" disabled={isLoading}>
          Upload
        </Button>
      </div>
    </form>
  );
};

export default ProductsImportForm;
