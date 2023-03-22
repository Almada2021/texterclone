import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { userId } = req.query;
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid id");
    }
    const existingUser = await prisma?.user.findUnique({
      where: {
        id: userId,
      },
    });
    const followersCount = await prisma?.user.count({
      where: {
        followingsIds: {
          has: userId,
        },
      },
    });
    return res.status(200).json({ ...existingUser, followersCount });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}