// import { CertificateType } from '../models/certificatetype.cjs';
// import { File } from '../models/file.cjs';

import db from '../models/index.cjs';

const File = db.files
const CertificateType = db.certificateType

// Obtener todos los tipo de certificados
export const getCertificateTypes = async (req, res) => {
  try {
    const certificateTypes = await CertificateType.findAll();
    res.status(200).json(certificateTypes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tipo de certificados' });
  }
};

// Obtener un tipo de certificado por ID
export const getCertificateTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const certificateType = await CertificateType.findByPk(id, {
      attributes: {
        exclude: ["id"], // Excluye el campo 'contraseña' del resultado
      },
    });
    if (certificateType) {
      res.status(200).json(certificateType);
    } else {
      res.status(404).json({ error: 'Tipo de certificado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tipo de certificado por ID' });
  }
};

//Crear un nuevo tipo de certificado
export const createCertificateType = async (req, res) => {
  const certificateTypeData = req.body;
  try {
    const newCertificateType = await CertificateType.create(certificateTypeData);
    res.status(201).json(newCertificateType);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tipo de certificado' });
  }
};

// Actualizar un tipo de certificado por ID
export const updateCertificateType = async (req, res) => {
  const { id } = req.params;
  const updatedCertificateTypeData = req.body;
  try {
    const certificateType = await CertificateType.findByPk(id);
    if (certificateType) {
      await certificateType.update(updatedCertificateTypeData);
      res.status(200).json(certificateType);
    } else {
      res.status(404).json({ error: 'Tipo de certificado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar tipo de certificado' });
  }
};

// Eliminar un tipo de certificado por ID
export const deleteCertificateType = async (req, res) => {
  const { id } = req.params;
  try {
    const certificateType = await CertificateType.findByPk(id);
    if (certificateType) {
      await certificateType.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Tipo de certificado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tipo de certificado' });
  }
};


export const getCertificateTypeFiles = async (req, res) => {
  const { id } = req.params
  const files = await File.findAll({
    where: { certificateTypeId: id }
  })

  res.json(files)
}
