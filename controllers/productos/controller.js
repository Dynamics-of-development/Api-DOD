const deleteProduct = async (id, callback) => {
  const filtroProducto = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection("productos").deleteOne(filtroProducto, callback);
};

export { queryAllProduct, postProduct, patchProduct, deleteProduct };
