// email sender

// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//     },
// });

// const sendEmail = (email, subject, text) => {
//     const mailOptions = {
//         from: process.env.EMAIL,
//         to: email,
//         subject: subject,
//         text: text,
//     };

//     transporter.sendMail(mailOptions, (err, data) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Email sent');
//         }
//     });
// };

// export default sendEmail;
