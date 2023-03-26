import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method !== "POST"){
        return res.status(405).end();
    }
    try {
        const { currentUser } : any = await serverAuth(req);
        const { body } = req.body;
        const { postId } = req.query;
        if(!postId || typeof postId !== "string"){
            throw new Error("Invalid ID");

        }
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}