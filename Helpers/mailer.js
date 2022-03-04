const nodeMailer = require("nodemailer");
exports.sendEmail = emailData => {
    const transporter = nodeMailer.createTransport({
        host: "gmail",
        port: 8080,
        secure: false,
        service: "Gmail",
        // requireTLS: true,
        // .........................this is for online.........................
        //  service: "Gmail",

        //  port: 465,
        //  secure: true,
        // .......................................................
        auth: {
            user: "vishalpatait.techila@gmail.com",
            pass: "1222222"
        }
    });
    return transporter
        .sendMail(emailData)
        .then(info => console.log(`Message sent: ${info.response}`))
        .catch(err => console.log(`Problem sending email: ${err}`));
};
