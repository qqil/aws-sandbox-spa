import { useMutation } from "react-query";
import { ensureTrailingSlash } from "../utils/url";

export const useUploadCSVMutation = () => {
  return useMutation(async (file: File) => {
    try {
      if (file.size > 1000000)
        throw new Error(`File size is too large. Allowed up to 1MB.`);

      const importUrl = new URL(
        "./import",
        ensureTrailingSlash(import.meta.env["PUBLIC_API_IMPORT_SERVICE"])
      );
      importUrl.searchParams.set("name", file.name);

      const signedUrlResponse = await fetch(importUrl, { method: "GET" });
      const { signedUrl } = await signedUrlResponse.json();
      const response = await fetch(signedUrl, {
        method: "PUT",
        body: file,
      });

      if (!response.ok)
        throw new Error(
          `Failed to upload file. (${response.status}: ${response.statusText})`
        );
    } catch (e: any) {
      throw e.message;
    }
  });
};
