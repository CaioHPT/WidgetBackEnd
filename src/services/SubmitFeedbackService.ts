import { MailAdapter } from "../adapters/MailAdapters";
import { FeedbacksRepositoy } from "../repositories/FeedbacksRepositories";

interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {
    private repositorie: FeedbacksRepositoy;
    private mailAdapter: MailAdapter

    constructor(feedbackRepository: FeedbacksRepositoy, mailAdapter: MailAdapter) {
        this.repositorie = feedbackRepository;
        this.mailAdapter = mailAdapter;
    }

    async execute(request: SubmitFeedbackServiceRequest) {
        const { type, comment, screenshot } = request

        await this.repositorie.create({
            type: type,
            comment: comment,
            screenshot: screenshot
        })

        if(!type){
            throw new Error('Type is required')
        }

        if(!comment){
            throw new Error('Comment is required')
        }


        if(screenshot && !screenshot.startsWith("data:image/png;base64")){
            throw new Error("Invalid screenshot format.")
        }

        await this.mailAdapter.sendMail({
            subject: type,
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111";`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentario: ${comment}</p>`,
                screenshot ? `<img src=${screenshot} width="800"/>`: '',
                `</div>`
            ].join("\n")
        })
    }
}