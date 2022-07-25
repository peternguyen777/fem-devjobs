import formidable from "formidable";
import sanityClient from "@sanity/client";

const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(sanityConfig);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./";
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log(fields, files);

    const {
      company,
      logoBgH,
      logoBgS,
      logoBgL,
      position,
      contract,
      location,
      website,
      apply,
      description,
      reqContent,
      roleContent,
    } = fields;

    const { logo } = files; ///HAVE A LOOK AT HOW TO PASS THE FILE INTO SANITY

    //TRANSFORM HSL DATA
    const logoBackground = `hsl(${logoBgH}, ${logoBgS}%, ${logoBgL}%)`;
    //ADD DATE DATA
    const postedAt = new Date();
    // parse reqItems
    const reqItems = JSON.parse(fields.reqItems);
    //parse roleItems
    const roleItems = JSON.parse(fields.roleItems);

    try {
      client.create({
        _type: "jobPost",
        approved: false,
        company,
        logo,
        logoBackground,
        position,
        postedAt,
        contract,
        location,
        website,
        apply,
        description,
        requirements: {
          content: reqContent,
          items: reqItems,
        },
        role: {
          content: roleContent,
          items: roleItems,
        },
      });
      res.status(200).json({ data: "success!" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Couldn't submit job post. Try again.", err });
    }

    console.log("job post submitted!");
  });
};
