import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.yandex.com",
    secure:true,
    port:465,
    auth: {
        user: 'nreniShop@yandex.ru',
        pass: 'mlqyzuyynzoukngv'
    }
});

class Email {

    static sendActivationEmail(email, token, frontUrl) {
        console.log(email)
        return transporter.sendMail({
            from: '"Nreni" <nreniShop@yandex.ru>',
            to: email,
            subject: 'Complete Registration',
            html: `<a href="${frontUrl}?email=${email}&token=${token}">Complete Registration</a>`
        })
    }
}

export default Email
