import Express from "express";
import {
  queryAllProduct,
  postProduct,
  patchProduct,
  deleteProduct,
} from "../../controllers/productos/controller.js";

const rutasProductos = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando los productos");
  } else {
    res.json(result);
  }
};

rutasProductos.route("/productos/").get((req, res) => {
  console.log("alguien hizo un get a la ruta /productos/");
  queryAllProduct(genericCallback(res));
});

rutasProductos.route("/productos/").post((req, res) => {
  postProduct(req.body, genericCallback(res));
});

rutasProductos.route("/productos/:id").patch((req, res) => {
  patchProduct(req.params.id, req.body, genericCallback(res));
});

rutasProductos.route("/productos/:id/").delete((req, res) => {
  console.log("alguien hizo un delete a la ruta /productos/eliminar");
  deleteProduct(req.params.id, genericCallback(res));
});
export default rutasProductos;
