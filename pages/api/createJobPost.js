// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sanityClient from "@sanity/client";

const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: "2021-11-16",
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(sanityConfig);

export default async function createJobPost(req, res) {
  const {
    company,
    logoId,
    logoBgH,
    logoBgS,
    logoBgL,
    position,
    contract,
    location,
    website,
    apply,
    description,
    reqItems,
    roleItems,
    roleContent,
    reqContent,
  } = JSON.parse(req.body);

  // //TRANSFORM HSL DATA
  const logoBackground = `hsl(${logoBgH}, ${logoBgS}%, ${logoBgL}%)`;
  // //ADD DATE DATA
  const postedAt = new Date();
  // // parse reqItems
  const reqArray = reqItems.map((item) => {
    return item.items;
  });
  const filteredReqItems = reqArray.filter((str) => str.trim() !== "");
  // //parse roleItems
  const rolArray = roleItems.map((item) => {
    return item.items;
  });
  const filteredRoleItems = rolArray.filter((str) => str.trim() !== "");

  try {
    const response = await client.create({
      _type: "jobPost",
      approved: false,
      company,
      logo: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: logoId,
        },
      },
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
        items: filteredReqItems,
      },
      role: {
        content: roleContent,
        items: filteredRoleItems,
      },
    });
    res.status(200).json({ data: "success!" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Couldn't submit job post. Try again.", err });
  }
  console.log("job post submitted!");
}
