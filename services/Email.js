import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    secure: true,

    host: "smtp.yandex.com",
    port: 465,
    auth: {
        user: 'tigran@ghost-services.com',
        pass: 'dceszswwpzbbqzcm',
    },
});

class Email {

    static sendActivationEmail(email, token, frontUrl) {
        return transporter.sendMail({
            from: '"Tigran" <tigran@ghost-services.com>',
            to: email,
            subject: 'Complete Registration',
            html: `<a href="${frontUrl}?email=${email}&token=${token}">Complete Registration</a>`
        })
    }
}

export default Email
