// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sanityClient from "@sanity/client";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(config);

export default async function createComment(req, res) {
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
    reqItems,
    roleItems,
    role,
    requirements,
  } = JSON.parse(req.body);

  console.log(company);

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
    await client.create({
      _type: "jobPost",
      approved: false,
      company,
      logoBackground,
      position,
      postedAt,
      contract,
      location,
      website,
      apply,
      description,
      requirements: {
        content: requirements.content,
        items: filteredReqItems,
      },
      role: {
        content: role.content,
        items: filteredRoleItems,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Couldn't submit job post", err });
  }

  console.log("job post submitted!");
}
