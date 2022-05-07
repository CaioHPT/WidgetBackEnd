import { MailAdapter, SendMailData } from "../MailAdapters";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "55795ebe077d1f",
        pass: "242c9985cb2b96"
    }
});

export class NodeMailerAdapter implements MailAdapter {

    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: "Equipe Caioba <caio@gmail.com>",
            to: "CaioHPT <caio.h.teixeira@gmail.com>",
            subject: subject,
            html: body
        })
    }
}