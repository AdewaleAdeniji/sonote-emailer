const nodemailer = require("nodemailer");

const sendEmail = async (
  from: string,
  title: string,
  text: string,
  to: string,
  user: any
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      user: user.appEmail,
      pass: user.appPassword,
    },
  });
  const mailOptions = {
    from,
    to: to,
    subject: title,
    html: text,
  };
  // var res = null
  // await transporter.sendMail(mailOptions, (error: any, info: any) => {
  //   if (error) {
  //     res = error;
  //   } else {
  //     res = info
  //   }
  // });
  // return res;
  const sendEMail = (mailOptions: any) => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  };

  try {
    const result = await sendEMail(mailOptions);
    return { success: true, result }; // Success: Returns the `info` object
  } catch (error) {
    return { success: false, error }; // Error: Returns the `error` object
  }
};

module.exports = sendEmail;
