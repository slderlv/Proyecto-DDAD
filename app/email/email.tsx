/* import nodemailer from 'nodemailer';

async function sendEmail(destinatario: string, asunto: string, contenido: string) {
  // Configuración del transporte de correo
  const transporter = nodemailer.createTransport({
    // Configuración del servicio de correo (por ejemplo, Gmail)
    service: 'gmail',
    auth: {
      user: 'ddad.proyecto.mailbot@gmail.com',
      pass: 'desarrolloaplicaciones',
    },
  });

  // Configuración del mensaje de correo
  const mensaje = {
    from: 'ddad.proyecto.mailbot@gmail.com',
    to: destinatario,
    subject: asunto,
    text: contenido,
  };

  try {
    // Enviar el correo electrónico
    const info = await transporter.sendMail(mensaje);
    console.log('Correo electrónico enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
}

export default sendEmail;
 */