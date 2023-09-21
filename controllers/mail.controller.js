import Email from "../helpers/email.js";

export const contactForm = async (req, res) => {
const {name,email,subject, message} = req.body

  try {
    await new Email("","","",name,email,subject,message).sendContactForm()
    res.status(200).json({ message: 'Correo electrónico enviado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al enviar el correo electrónico' });
  }

}