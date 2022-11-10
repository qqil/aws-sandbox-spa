import { useMutation } from "react-query";
import { withBasicAuth } from "../utils/fetch-auth";
import { ensureTrailingSlash } from "../utils/url";

export const useUploadCSVMutation = () => {
  const fetchAuthorized = withBasicAuth(fetch);

  return useMutation(async (file: File) => {
    if (file.size > 1000000)
      throw new Error(`File size is too large. Allowed up to 1MB.`);

    const importUrl = new URL(
      "./import",
      ensureTrailingSlash(import.meta.env["PUBLIC_API_IMPORT_SERVICE"])
    );
    importUrl.searchParams.set("name", file.name);

    const signedUrlResponse = await fetchAuthorized(importUrl, {
      method: "GET",
    });

    const { signedUrl } = await signedUrlResponse.json();
    const uploadResponse = await fetch(signedUrl, {
      method: "PUT",
      body: file,
    });

    if (!uploadResponse.ok)
      throw new Error(
        `Failed to upload file. (${uploadResponse.status}: ${uploadResponse.statusText})`
      );
  });
};
