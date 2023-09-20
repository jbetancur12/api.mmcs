import Email from "../helpers/email.js"

export const contactForm = async (req, res) => {
const {name,email,subject, message} = req.body

  try {
    await new Email("","","",name,email,subject,message).sendContactForm()
  } catch (error) {

  }

}