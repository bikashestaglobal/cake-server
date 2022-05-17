const nodemailer = require("nodemailer");

module.exports.sendOTPEmail = async ({ emailTo, subject, name, otp }) => {
  try {
    // Create Transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      host: process.env.HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "codescroller@gmail.com", // generated ethereal user
        pass: "Code84$$$", // generated ethereal password
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      // from: process.env.EMAIL_FROM, // sender address
      from: '"Code Scroller" codescroller@gmail.com', // sender address
      to: emailTo, // list of receivers
      subject: subject, // Subject line
      // text: text, // plain text body
      html: `<div style='font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2'>
      <div style='margin:50px auto;width:70%;padding:20px 0'>
        <div style='border-bottom:1px solid #eee'>
          <a href='' style='font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600'>Code Scroller</a>
        </div>
        <p style='font-size:1.1em'>Hi, <b> ${name} </b> </p>
        <p>Your Account needs Verification. Use the following OTP to complete your Registration procedures. OTP is given below</p>
        <h2 style='background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;'>${otp}</h2>
        <p style='font-size:0.9em;'>Regards,<br />Code Scroller</p>
        <hr style='border:none;border-top:1px solid #eee' />
        <div style='float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300'>
          <p>Code Scroller</p>
          <p>Ford Company Chowk</p>
          <p>Purnia</p>
        </div>
      </div>
    </div>`, // html body
    });
    return info.messageId;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
