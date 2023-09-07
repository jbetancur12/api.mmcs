import minioClient from "../config/minio.js";
import { File } from "../models/file.js";



export const getFiles = (req, res) => {
  res.send('Getting projects');
}

//POST
export const createFile = (req, res) => {
  const file = req.file;
  const { name, dalibrationDate } = req.body;

  const finalName = name ? name : file.originalname;

  const fileName =  `${Date.now()}-${file.originalname}`;

  minioClient.putObject('first-bucket', fileName, file.buffer, async (err, etag) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al subir el archivo a MinIO');
    }

    try {
      const newFile = await File.create({
        name: file.originalname,
        dalibrationDate: new Date(), // Puedes ajustar esta fecha según tus necesidades
        filePath: fileName,
      });

      res.json({
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

export const getFile = (req, res) => {
  const { id } = req.params
  const bucketName = 'first-bucket';

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
    minioClient.removeObject('first-bucket', fileName, (err) => {
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