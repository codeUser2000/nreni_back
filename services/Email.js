import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
        user: 'helga.labadie@ethereal.email',
        pass: 'YdyxXH2VTmDrvBtdBc'
    }
});

class Email {

    static sendActivationEmail(email, token, frontUrl) {
        return transporter.sendMail({
            from: '"Nreni" <helga.labadie@ethereal.email>',
            to: email,
            subject: 'Complete Registration',
            html: `<a href="${frontUrl}?email=${email}&token=${token}">Complete Registration</a>`
        })
    }
}

export default Email
