import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: 'aidahakobyanff',
        pass: 'frozenkyanq2000.',
    },
});

class Email {

    static sendActivationEmail(email, token, frontUrl) {
        return transporter.sendMail({
            from: '"Nreni" <aidahakobyanff@gmail.com>',
            to: email,
            subject: 'Complete Registration',
            html: `<a href="${frontUrl}?email=${email}&token=${token}">Complete Registration</a>`
        })
    }
}

export default Email
