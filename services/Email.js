import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    secure:true,
    port:465,
    auth: {
        user: 'nrenishop@mail.ru',
        pass: 'bvG8vT0fNRfktqV3DPy9'
    }
});

class Email {

    static sendActivationEmail(email, token, frontUrl) {
        console.log(email)
        return transporter.sendMail({
            from: '"Nreni" <nrenishop@mail.ru>',
            to: email,
            subject: 'Complete Registration',
            html: `<a href="${frontUrl}?email=${email}&token=${token}">Complete Registration</a>`
        })
    }
}

export default Email
