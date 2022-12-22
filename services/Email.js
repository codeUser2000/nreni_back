import nodemailer from "nodemailer";
const { FRONT_URL } = process.env
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
            html: `<a href="${FRONT_URL}complete?email=${email}&token=${token}">Complete Registration</a>`
        })
    }
    static sendDropPassword(email) {
        console.log(email,6776)
        return transporter.sendMail({
            from: '"Nreni" <nreniShop@yandex.ru>',
            to: email,
            subject: 'Drop Password',
            html: `<a href="${FRONT_URL}new-password">Drop Password</a>`
        })
    }
}

export default Email
