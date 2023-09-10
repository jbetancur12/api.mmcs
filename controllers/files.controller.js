import config from "../config/configEnv.js";
import minioClient from "../config/minio.js";
// import { CertificateType } from "../models/certificatetype.cjs";
// import { Device } from "../models/device.cjs";
// import { File } from "../models/file.cjs";
// import { User } from "../models/user.cjs";


import db from '../models/index.cjs';


const Device = db.device
const File = db.file
const User = db.user
const CertificateType = db.certificateType



export const getFiles = async (req, res) => {
  try {
    const authenticatedUser = req.user;

    // Verificar si el usuario tiene el rol de administrador
    if (authenticatedUser.rol === "admin") {
      const files = await File.findAll({
        include: [
          { model: User },
          { model: Device },
          { model: CertificateType },
        ],
      });
      res.json(files);
    } else {
      // Si el usuario no es administrador, mostrar solo sus archivos
      const userFiles = await File.findAll({
        where: { userId: authenticatedUser.userId },
        include: [
          { model: User },
          { model: Device },
          { model: CertificateType },
        ],
      });
      res.json(userFiles);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los archivos' });
  }
};


//POST
export const createFile = (req, res) => {
  const file = req.file;
  const { name, calibrationDate, userId, deviceId, certificateTypeId, nextCalibrationDate, city, location, sede, activoFijo, serie } = req.body;


  const finalName = name ? name : file.originalname;

  const fileName = `${Date.now()}-${file.originalname}`;

  minioClient.putObject(config.minioBucketName, fileName, file.buffer, async (err, etag) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al subir el archivo a MinIO');
    }

    try {
      const newFile = await File.create({
        name: file.originalname,
        calibrationDate: new Date(calibrationDate), // Puedes ajustar esta fecha según tus necesidades
        filePath: fileName,
        userId,
        deviceId,
        certificateTypeId,
        nextCalibrationDate,
        city,
        location,
        sede,
        activoFijo,
        serie
      });

      res.status(201).json({
        message: 'Archivo subido exitosamente',
        pathArchivo: fileName,
        fileId: newFile.id, // Puedes enviar el ID del archivo recién creado si lo necesitas
      });

    } catch (error) {
      console.error(error);
      res.status(500).send('Error al guardar el archivo en la base de datos');

    }


  });
}

export const getFile = async (req, res) => {
  try {
    const { id } = req.params
    const file = await File.findOne({
      where: {
        id
      }
    })

    if(!file) return res.status(404).json({message: 'File No Existe'})

    res.json(file)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const downloadFile = (req, res) => {
  const { id } = req.params
  const bucketName = config.minioBucketName;

  const partes = id.split("-");
  let resultado = "";

  if (partes.length > 1) {
    resultado = partes.slice(1).join("-");
  } else {
    resultado = id;
  }

  minioClient.getObject(bucketName, id, (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).send('Error al Descargar el archivo a MinIO');
    }


    res.setHeader('Content-Disposition', `attachment; filename=${resultado}`);
    result.pipe(res);

  });

}

export const deleteFile = async (req, res) => {
  const fileId = req.params.id; // Obtén el ID del archivo desde los parámetros de la solicitud

  try {
    // Buscar el archivo en la base de datos por su ID
    const file = await File.findByPk(fileId);


    if (!file) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    // Obtener el nombre del archivo desde la base de datos
    const fileName = file.filePath;


    // Eliminar el archivo de MinIO
    minioClient.removeObject(config.minioBucketName, fileName, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al eliminar el archivo de MinIO');
      }

      // Eliminar el archivo de la base de datos después de eliminarlo de MinIO
      file.destroy();

      res.json({ message: 'Archivo eliminado exitosamente' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el archivo');
  }
}