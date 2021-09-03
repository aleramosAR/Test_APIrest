import {
  loadProductos,
  loadProducto,
  saveProducto,
  deleteProducto,
  updateProducto,
  clearProductos
} from '../persistencia/Productos.js';

async function getProductosNegocio() {
  return await loadProductos();
}

async function getProductoNegocio(id) {
  return await loadProducto(id);
}

async function postProductoNegocio(producto) {
  await saveProducto(producto);
  return producto;
}

async function deleteProductoNegocio(id) {
  const producto = await deleteProducto(id);
  return producto;
}

async function updateProductoNegocio(id, newData) {
  const prod = await getProductoNegocio(id);
  if (!prod) { return res.status(404).json({ error: "Producto no encontrado." }); }

  let newProduct = {};
  newProduct.title = newData.title || prod.title;
  newProduct.price = newData.price || prod.price;
  newProduct.thumbnail = newData.thumbnail || prod.thumbnail;

  const updatedProduct = await updateProducto(id, newProduct);
  return updatedProduct;
}

async function clearProductoNegocio() {
  await clearProductos();
}

export {
  getProductosNegocio,
  getProductoNegocio,
  postProductoNegocio,
  deleteProductoNegocio,
  updateProductoNegocio,
  clearProductoNegocio
}