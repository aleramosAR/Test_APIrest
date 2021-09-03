import express from "express";
import prodRoutes from './ProductRoutes.js';
import frontRoutes from './FrontRoutes.js';

const routes = express.Router();
routes.use(express.json());

routes.use('/', frontRoutes);
routes.use('/api/productos', prodRoutes);
routes.get('*', function (req, res) { res.render('404'); });

export default routes;