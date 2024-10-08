import { DocumentProcessorServiceClient } from "@google-cloud/documentai";
import { getGCPCredentials } from "./getGcpCredentials";
const client = new DocumentProcessorServiceClient();
export async function scan(uri, mime) {
    const name =
        "projects/832593823455/locations/us/processors/79eb62ab2e02cbd1";

    const mimeTypes = {
        png: "image/png",
        jpg: "image/jpeg",
        pdf: "application/pdf",
    };

    const mimeType = mimeTypes["png"];
    const req = {
        name,
        gcsDocument: {
            gcsUri: uri,
            mimeType: "image/png",
        },
    };
    const [result] = await client.processDocument(req);
    return result;
}
