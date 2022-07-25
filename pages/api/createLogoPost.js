// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sanityClient from "@sanity/client";
import formidable from "formidable";
import { createReadStream } from "fs";
import { basename } from "path";

const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: "2021-11-16",
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(sanityConfig);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function createLogoPost(req, res) {
  const form = new formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    const filePath = files.image.filepath;

    try {
      client.assets

        .upload("image", createReadStream(filePath), {
          filename: basename(filePath),
        })
        .then((document) => {
          // console.log("document is:", document);
          res.status(200).json({ data: "success!", _id: document._id });
        });
    } catch (err) {
      console.log("Upload failed:", err.message);
      return res
        .status(500)
        .json({ message: "Couldn't submit job post. Try again.", err });
    }
    console.log("job post submitted!");
  });
}
