const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario/usuarioSchema'); // Asegúrate de usar la ruta correcta a tu modelo
const nodemailer = require('nodemailer');

// Transportador de Nodemailer (Configuración del servicio de correo)
const transporter = nodemailer.createTransport({
    service: 'gmail', // O el servicio de correo que uses
    auth: {
        user: 'seminothomas8196@gmail.com', // Tu correo de Gmail
        pass: 'wguz arci hkkm jkxa' // Tu contraseña de Gmail
    }
});

// Función para generar una contraseña temporal
function generarContrasenaTemporal() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let contrasena = '';
    for (let i = 0; i < 8; i++) {
        contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return contrasena;
}

// Controlador para registrar un nuevo usuario
const create = async (req, res) => {
    const { email, password, rol } = req.body;

    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);  // Genera un "salt" con 10 rondas
        const hashedPassword = await bcrypt.hash(password, salt);  // Encripta la contraseña

        // Crear el nuevo usuario
        const nuevoUsuario = new Usuario({
            email,
            password: hashedPassword,
            rol
        });

        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

// Controlador para loguearse (verificar email y contraseña)

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        // Buscar al usuario por su email
        const usuario = await Usuario.findOne({ email });
  
        // Si no se encuentra al usuario
        if (!usuario) {
            return res.status(401).json({ 
                success: false,
                message: 'Credenciales inválidas' 
            });
        }

        // Verificar la contraseña
        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ 
                success: false,
                message: 'Credenciales inválidas' 
            });
        }
  
        // Si las credenciales son válidas
        res.status(200).json({
            success: true,
            message: 'Login exitoso',
            rol: usuario.rol,
            userId: usuario._id.toString()
        });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error en el servidor' 
        });
    }
};

const recuperarPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Buscar usuario por email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'No se encontró un usuario con ese email' });
        }

        // Generar contraseña temporal
        const nuevaPassword = generarContrasenaTemporal();

        // Hashear la nueva contraseña temporal
        const hashedPassword = await bcrypt.hash(nuevaPassword, 10);

        // Actualizar contraseña en la base de datos
        usuario.password = hashedPassword;
        await usuario.save();

        // Enviar correo con la nueva contraseña
        await transporter.sendMail({
            from: 'tucorreo@gmail.com',
            to: email,
            subject: '🔑 Tu Contraseña Temporal',
            html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f7fc;
                            color: #333;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 30px auto;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            font-size: 24px;
                            color: #4CAF50;
                        }
                        .content {
                            font-size: 16px;
                            line-height: 1.5;
                            margin: 20px 0;
                        }
                        .password {
                            font-size: 20px;
                            font-weight: bold;
                            color: #D32F2F;
                            background-color: #FFEBEE;
                            padding: 10px;
                            border-radius: 5px;
                        }
                        .footer {
                            font-size: 14px;
                            color: #777;
                            text-align: center;
                            margin-top: 30px;
                        }
                        .emoji {
                            font-size: 30px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <span class="emoji">🔑</span> ¡Tu Contraseña Temporal Aquí!
                        </div>
                        <div class="content">
                            <p>Hola, <strong>estimado usuario</strong> 👋,</p>
                            <p>Para acceder a tu cuenta, hemos generado una contraseña temporal. Por favor, úsala para ingresar a tu cuenta.</p>
                            <p><strong>Tu contraseña temporal es:</strong></p>
                            <div class="password">${nuevaPassword}</div>
                            <p>Recuerda que esta contraseña es válida solo por un tiempo limitado. Te recomendamos cambiarla por una más segura después de iniciar sesión. 🔒</p>
                            <p>Si no has solicitado este cambio, por favor ignora este mensaje.</p>
                        </div>
                        <div class="footer">
                            <p>Saludos cordiales,</p>
                            <p>El equipo de OdontoSistem 😄</p>
                        </div>
                    </div>
                </body>
            </html>
            `
        });

        res.json({ mensaje: 'Se ha enviado una nueva contraseña temporal a tu correo electrónico.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al recuperar la contraseña.' });
    }
};

const cambiarPassword = async (req, res) => {
    const { email, contrasenaTemporal, nuevaContrasena } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ message: 'El usuario no existe' });
        }

        // Verificar si la contraseña temporal es correcta
        const esValida = await bcrypt.compare(contrasenaTemporal, usuario.password);
        if (!esValida) {
            return res.status(400).json({ message: 'La contraseña temporal es incorrecta' });
        }

        // Encriptar la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(nuevaContrasena, salt);

        // Actualizar la contraseña en la base de datos
        usuario.password = contrasenaEncriptada;
        await usuario.save();

        // Responder con un mensaje de éxito
        res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo un error al cambiar la contraseña' });
    }
};


async function actualizarContraseña(req, res) {
    const { id } = req.params;
    const { password } = req.body;
  

    if (!password) {
      return res.status(400).json({ error: 'La contraseña es requerida' });
    }
  
    try {

      const usuario = await Usuario.findById(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      
      usuario.password = hashedPassword;
      await usuario.save();
  
      
      res.status(200).json({ mensaje: 'Contraseña actualizada correctamente' });
    } catch (error) {
      
      res.status(500).json({
        error: 'Error al actualizar la contraseña',
        detalle: error.message,
      });
    }
  }
module.exports = { create, login, recuperarPassword, cambiarPassword, actualizarContraseña };

