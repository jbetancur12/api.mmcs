// import { Customer } from '../models/certificatetype.cjs';
// import { File } from '../models/file.cjs';

import db from '../models/index.cjs';

const File = db.files
const Customer = db.customer

// Obtener todos los customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener customers' });
  }
};

// Obtener un customer por ID
export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id, {
      attributes: {
        exclude: ["id"], // Excluye el campo 'contraseña' del resultado
      },
    });
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: 'Tipo de certificado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener customer por ID' });
  }
};

//Crear un nuevo customer
export const createCustomer = async (req, res) => {
  const customerData = req.body;
  try {
    const newCustomer = await Customer.create(customerData);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear customer' });
  }
};

// Actualizar un customer por ID
export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const updatedCustomerData = req.body;
  try {
    const customer = await Customer.findByPk(id);
    if (customer) {
      await customer.update(updatedCustomerData);
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

// Eliminar un customer por ID
export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (customer) {
      await customer.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Tipo de certificado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar customer' });
  }
};


export const getCustomerFiles = async (req, res) => {
  const { id } = req.params
  const files = await File.findAll({
    where: { customerId: id }
  })

  res.json(files)
}
