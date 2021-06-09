const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default (req, res) => {
  const email = JSON.parse(req.body)

  const data = {
    to: `${email}`,
    // to: 'alecmega@student.arteveldehs.be',
    from: 'alecmeganck@icloud.com',
    subject: 'Dit is een testmail',
    templateId: 'd-c6531e7fdedc43a3986030db83461e49',
  }

  mail
    .send(data)
    .then(() => {
      console.log("Email was successfully sent")
    })
    .catch((error) => {
      console.log(error)
    })

  res.status(200).json({ status: 'Ok' })
}
