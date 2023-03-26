import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }
  try {
    const { userId } = req.body;
    const { currentUser }: any = await serverAuth(req);
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("Invalid Id");
    }
    if (user?.id === currentUser?.id) {
      throw new Error("You cannnot subscribe to yourself");
    }
    let updatedFollowingIds = [...currentUser?.followingsIds] || [];
    if (req.method === "POST") {
      updatedFollowingIds.push(userId);
    }
    if (req.method === "DELETE") {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingsIds: updatedFollowingIds,
      },
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
