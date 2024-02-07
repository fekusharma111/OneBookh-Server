import nodemailer from "nodemailer";

export const mailSender = async (email, title, body) => {
  try {
    console.log("sending mail here", email, process.env.MAIL_HOST, process.env.MAIL_USER, process.env.MAIL_PASS);
    //to send email ->  firstly create a Transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.MAIL_HOST, //-> Host SMTP detail
      port: 587,
      secure: true,
      auth: {
        user: process.env.MAIL_ID, //-> User's mail for authentication
        pass: process.env.MAIL_USER, //-> User's password for authentication
      },
    });

    //now Send e-mails to users
    let info = await transporter.sendMail({
      from: process.env.MAIL_ID,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    console.log("Info is here: ", info);
    return info;
  } catch (error) {
    console.log("error in mailsender function", error.message);
    // return error;
    throw error;
  }
};
