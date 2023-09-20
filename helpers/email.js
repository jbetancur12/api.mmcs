import { convert } from 'html-to-text'
import nodemailer from 'nodemailer'
import path from 'path'
import pug from 'pug'
import { fileURLToPath } from 'url'
import config from '../config/configEnv.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { emailFrom, smtp } = config

export default class Email {
  constructor (user = {}, url ="", otp="", name="", email, subject="", message="") {
    this.firstName = user.firstName
    this.to = user.email || email
    this.from = emailFrom
    this.url = url
    this.otp = otp
    this.name = name
    this.email = email
    this.subject_ = subject
    this.message = message
  }

  newTransport () {
    // return nodemailer.createTransport(
    //   nodemailerSendgrid({
    //     apiKey: sendridPass
    //   })
    // )
    return nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      auth: {
        user: smtp.user,
        pass: smtp.pass
      }
    })
  }

  async send (template, subject) {
    // Generate HTML template based on the template string
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      firstName: this.firstName,
      subject,
      url: this.url,
      otp: this.otp,
      email_: this.email,
      subject_: this.subject_,
      name: this.name,
      message: this.message
    })
    // Create mailOptions
    const mailOptions = {
      from: `Metromedics SAS <${this.from}>`,
      to: this.to,
      subject,
      text: convert(html),
      html
    }
    console.log("🚀 ~ file: email.js:62 ~ Email ~ send ~ mailOptions:", mailOptions)

    try {
      const info = await this.newTransport().sendMail(mailOptions)
      console.log('NODEMAILER: ', nodemailer.getTestMessageUrl(info))
    } catch (error) {
      console.log('🚀 ~ file: email.js:56 ~ Email ~ send ~ error:', error)
    }
    // Send email
  }

  async sendContactForm(
    template = 'contactForm',
    subject = 'Formulario de Contacto'
  ){
    try {

      await this.send(template, subject)
    } catch (error) {
      console.log("🚀 ~ file: email.js:84 ~ Email ~ error:", error)

    }
  }

  async sendVerificationCode (
    template = 'verificationCode',
    subject = 'Activar Cuenta'
  ) {
    try {

      await this.send(template, subject)
    } catch (error) {
      console.log("🚀 ~ file: email.js:84 ~ Email ~ error:", error)

    }
  }

  async sendPasswordResetToken () {
    await this.send(
      'resetPassword',
      'Your password reset token (valid for only 10 minutes)'
    )
  }
}