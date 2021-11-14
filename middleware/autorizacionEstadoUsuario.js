import { ObjectId } from "mongodb";
import { getDB } from "../DB/db.js";
import jwt_decode from "jwt-decode";

const autorizacionEstadoUsuario = async (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const user = jwt_decode(token)["https://backend-dod.herokuapp.com/userData"];
  console.log(token);
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("usuario")
    .findOne({ email: user.email }, async (err, resp) => {
      console.log("response consulta BD", resp);
      if (resp) {
        console.log(resp);
        if (resp.estado === "No autorizado") {
          res.sendStatus(401);
        } else {
          console.log("habilitado");
          next();
        }
      } else {
        next();
      }
    });
  console.log("hola mundo, soy un middleware");
};

export default autorizacionEstadoUsuario;
