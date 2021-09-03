import {PORT} from '../utils/config.js';

function redirectIndexController(req, res) {
  res.redirect('/index');
};

function goIndexController(req, res) {
  res.render("index");
};

let visitas = 0;
function goVisitasController(req, res) {
  res.end(`Visitas: ${++visitas}`);
};

function goExitController(req, res) {
  res.end("Salida del proceso de node.js");
  process.exit();
};

export {
  redirectIndexController,
  goIndexController,
  goVisitasController,
  goExitController
}