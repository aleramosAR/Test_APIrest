import axios from "axios";

const baseURL = 'http://localhost:8080/api/productos';
let firstID, lastID;

async function addProducto(producto) {
  try {
    const newprod = await axios.post(`${baseURL}/`, producto);
    console.log(`🟢 Nuevo producto creado: "${newprod.data.title}"`);
  } catch (error) {
    console.log(error); 
  }
}

async function getProductos() {
  try {
    const productos = await axios.get(`${baseURL}/`);
    const listado = JSON.stringify(productos.data, null, 2);
    firstID = productos.data[0]._id;
    lastID = productos.data[productos.data.length-1]._id;
    console.log(listado);
  } catch (error) {
    console.log(error); 
  }
}

async function updateProducto(id) {
  try {
    await axios.put(`${baseURL}/actualizar/${id}`, { "price": 99 });
    console.log('🔵 Precio del primer producto modificado.');
  } catch (error) {
    console.log(error); 
  }
}

async function deleteProducto(id) {
  try {
    await axios.delete(`${baseURL}/borrar/${id}`, { "price": 99 });
    console.log('❌ Ultimo producto eliminado.');
  } catch (error) {
    console.log(error); 
  }
}

async function clearProductos() {
  try {
    await axios.post(`${baseURL}/destroy`);
    console.log(`🔴 Base de datos borrada.`);
  } catch (error) {
    console.log('Hubo un error al reiniciar la base de datos.'); 
  }
}


async function runTests() {
  console.log("-- INCIO TESTEO AXIOS -----------");
  await addProducto({"title": "Bananas", "price": 90, "thumbnail": "10"});
  await addProducto({"title": "Peras", "price": 70, "thumbnail": "12"});
  await addProducto({"title": "Uvas", "price": 110, "thumbnail": "09"});
  await addProducto({"title": "Cerezas", "price": 140, "thumbnail": "03"});
  console.log('\nLISTADO DE PRODUCTOS:');
  await getProductos();
  await updateProducto(firstID);
  await deleteProducto(lastID);
  console.log('\nLISTADO DE PRODUCTOS ACTUALIZADO:');
  await getProductos();
  await clearProductos();
  console.log("-- FIN TESTEO AXIOS -----------");
}

runTests();