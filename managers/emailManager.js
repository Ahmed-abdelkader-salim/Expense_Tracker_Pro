const nodemailer = require("nodemailer")
const emailManager = async (to, text, html ,subject) => {



    
            const transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 587,
                secure:false,
                auth: {
                    user: "bbe8361205d611",
                    pass: "6c3a6fa8eb9113"
                }
            });
            await transport.sendMail({
                to:to,
                from:"info@expensetracker.com",
                text:text,
                html:html,
                subject:subject
            });
}


module.exports = emailManager;