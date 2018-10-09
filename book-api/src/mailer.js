import nodemailer from 'nodemailer';

const from  = '"Book" <test@book.com>';

function setup(){
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });
}

export function sendConfirmationEmail(user){
    const transport = setup();
    const email = {
        from,
        to: user.email,
        subject: "welcome",
        text: ` Welcome, Please confirm your email.

        ${user.generateConfirmationUrl()}
        `
    }

    transport.sendMail(email);
}

export function sendResetPasswordEmail(user){
    const transport = setup();
    const email = {
        from,
        to: user.email,
        subject: "Password reset",
        text: ` Click this link to reset password.

        ${user.generateResetPasswordLink()}
        `
    }

    transport.sendMail(email);
}