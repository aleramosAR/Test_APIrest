import Producto from './models/Producto.js';

async function loadProductos() {  
  try {
		return await Producto.find();
	} catch (error) {
		console.log(error);
	}
}

async function loadProducto(id) {
	try {
		return await Producto.findOne({ _id: id });
	} catch (error) {
		console.log(error);
	}
}

async function saveProducto(producto) {
  try {
		const newProducto = new Producto(producto);
	  await newProducto.save();
	} catch (error) {
		console.log(error);
	}
}

async function deleteProducto(id) {
  const deleted = await Producto.findOneAndRemove({ _id: id });
  if (deleted) {
    return deleted;
  } else {
    throw new Error('Producto no encontrado.');
  }
}

async function updateProducto(id, newProduct) {
	const updatedProducto = await Producto.replaceOne({ _id: id }, newProduct);
	return updatedProducto;
}

async function clearProductos() {  
  try {
		return Producto.deleteMany({});
	} catch (error) {
		console.log(error);
	}
}

export {
	loadProductos,
	loadProducto,
	saveProducto,
	deleteProducto,
	updateProducto,
	clearProductos
};
