import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepositoy } from "../FeedbacksRepositories";

 export class PrismaFeedbacksRepository implements FeedbacksRepositoy{

    async create(data: FeedbackCreateData){
        await prisma.feedback.create({
            data: {
                type: data.type,
                comment: data.comment,
                screenshot: data.screenshot
            }
        })
    }
 }