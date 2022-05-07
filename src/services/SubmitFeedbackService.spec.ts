import { SubmitFeedbackService } from "./SubmitFeedbackService"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe("Submit feedback", () => {
    it('should be able to submit a feedback', async() => {
        await expect(submitFeedback.execute({
            type: "bug",
            comment: "example comment",
            screenshot: "data:image/png;base64"
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()

    })

    it('should bot be able to submit a feedback without type', async() => {  
        await expect(submitFeedback.execute({
            type: "",
            comment: "example comment",
            screenshot: "data:image/png;base64"
        })).rejects.toThrow()
    })

    it('should bot be able to submit a feedback without comment', async() => {  
        await expect(submitFeedback.execute({
            type: "Bug",
            comment: "",
            screenshot: "data:image/png;base64"
        })).rejects.toThrow()
    })

    it('should bot be able to submit a feedback with an invalid screenshot', async() => {  
        await expect(submitFeedback.execute({
            type: "Bug",
            comment: "example",
            screenshot: "cacaca"
        })).rejects.toThrow()
    })
})