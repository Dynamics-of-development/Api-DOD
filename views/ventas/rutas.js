import Express from "express";
import {
  queryAllVentas,
  postVentas,
  patchVentas,
  deleteVentas,
} from "../../controllers/ventas/controller.js";

const rutasVentas = Express.Router();
const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando los ventas");
  } else {
    res.json(result);
  }
};

rutasVentas.route("/ventas/").get((req, res) => {
  console.log("alguien hizo un get a la ruta /ventas/");
  queryAllVentas(genericCallback(res));
});

rutasVentas.route("/ventas/").post((req, res) => {
  console.log("alguien hizo un post a la ruta /ventas/");
  postVentas(req.body, genericCallback(res));
});

//route de busqueda
rutasVentas.route("/ventas/:id/").get((req, res) => {
  console.log("alguien hizo un get a la ruta /ventas");
  searchVentas(req.params.id, genericCallback(res));
});

rutasVentas.route("/ventas/:id/").patch((req, res) => {
  patchVentas(req.params.id, req.body, genericCallback(res));
});

rutasVentas.route("/ventas/:id/").delete((req, res) => {
  console.log("alguien hizo un delete a la ruta /ventas/eliminar");
  deleteVentas(req.params.id, genericCallback(res));
});
export default rutasVentas;
