const nodemailer = require('nodemailer');



const sendEmail = async (options) =>{
   const {EMAIL,EMAIL_PASSWORD} = process.env
   console.log('EMAIL,EMAIL_PASSWORD',EMAIL,EMAIL_PASSWORD) 
 const transporter = nodemailer.createTransport({
    service : 'Gmail',
    auth:{
        user : EMAIL,
        pass: EMAIL_PASSWORD ,
    },
 })

 const mailoptions = {
    from: process.env.EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message, 
 }

  await transporter.sendMail(mailoptions,(error, info) => {
   if (error) {
     console.error(error);
   } else {
     console.log('Email sent: ' + info.response);
   }
})
}

module.exports = sendEmail