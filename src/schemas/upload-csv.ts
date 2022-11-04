import * as Yup from "yup";

export const uploadCsvSchema = Yup.object({
  file: Yup.mixed()
    .test((value) => {
      if (value.length > 1 || !value.length) return false;
      if (!(value instanceof FileList)) return false;
      if (value[0].type !== "text/csv") return false;

      return true;
    })
    .required(),
});

export type UploadCsv = Yup.InferType<typeof uploadCsvSchema>;
