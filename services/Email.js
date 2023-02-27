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
        return transporter.sendMail({
            from: '"Nreni" <nreniShop@yandex.ru>',
            to: email,
            subject: 'Complete Registration',
            html: `<a href="${FRONT_URL}complete?email=${email}&token=${token}">Complete Registration</a>`
        })
    }
    static sendActivationEmailDevice(email,code) {
        return transporter.sendMail({
            from: '"Nreni" <nreniShop@yandex.ru>',
            to: email,
            subject: 'Complete Registration',
            html: `<p>Your code ${code}</p>`
        })
    }
    static sendDropPassword(email) {
        return transporter.sendMail({
            from: '"Nreni" <nreniShop@yandex.ru>',
            to: email,
            subject: 'Drop Password',
            html: `<a href="${FRONT_URL}new-password?email=${email}">Drop Password</a>`
        })
    }
    static sendDropPasswordDevice(email, code) {
        return transporter.sendMail({
            from: '"Nreni" <nreniShop@yandex.ru>',
            to: email,
            subject: 'Drop Password',
                html: `<p>Your code ${code}</p>`
        })
    }
}

export default Email
