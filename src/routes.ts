import express from 'express';
import { NodeMailerAdapter } from './adapters/nodemailer/NodeMailerAdapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/PrismaFeedbacksRepository';
import { SubmitFeedbackService } from './services/SubmitFeedbackService';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    try {
        const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
        const nodeMailerAdapter = new NodeMailerAdapter()

        const submitFeedbackService = new SubmitFeedbackService(prismaFeedbacksRepository, nodeMailerAdapter)

        await submitFeedbackService.execute({
            type, comment, screenshot
        })

        return res.status(201).send()
    }catch(err){
        return res.status(500).send()
    }
})