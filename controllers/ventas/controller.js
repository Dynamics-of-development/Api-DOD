import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";

const queryAllVentas = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection("ventas").find().limit(50).toArray(callback);
};

const postVentas = async (datosVenta, callback) => {
  if (
    Object.keys(datosVenta).includes("valorVenta") &&
    Object.keys(datosVenta).includes("identificador") &&
    Object.keys(datosVenta).includes("cantidad") &&
    Object.keys(datosVenta).includes("precioUnitario") &&
    Object.keys(datosVenta).includes("fechaVenta") &&
    Object.keys(datosVenta).includes("cedulaCliente") &&
    Object.keys(datosVenta).includes("cliente") &&
    Object.keys(datosVenta).includes("vendedor")
  ) {
    const baseDeDatos = getDB();
    await baseDeDatos.collection("ventas").insertOne(datosVenta, callback);
    return "bien";
  } else {
    return "error";
  }
};

const searchVentas = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("ventas")
    .find({ _id: new ObjectId(id) }, callback);
};

const patchVentas = async (id, editVentas, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const operacion = {
    $set: editVentas,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("ventas")
    .findOneAndUpdate(
      filtroVenta,
      operacion,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const deleteVentas = async (id, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection("ventas").deleteOne(filtroVenta, callback);
};

export { queryAllVentas, postVentas, patchVentas, deleteVentas, searchVentas };
