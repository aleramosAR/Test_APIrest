const socket = io.connect();
let URL_BASE = '';

socket.on('initApp', data => { 
  URL_BASE = `http://localhost:${data.PORT}`;
});

if(window.location.pathname.split('/').pop() == 'index') {
  // Al agregar items recibo los eventos 'listProducts' y actualizo la interface.
  socket.on('listProducts', data => { renderProducts(data) });

  async function renderProducts(data) {
    const archivo = await fetch('plantillas/tabla.hbs');
    const archivoData = await archivo.text();
    const template = Handlebars.compile(archivoData);
    const result = template({ productos: data });
    document.getElementById('productos').innerHTML = result;
  }
};

// Agregar un nuevo producto.
function addProduct(e) {
  const inputTitle = document.getElementById('title');
  const inputPrice = document.getElementById('price');
  const inputThumb = document.getElementById('thumbnail');
  if (inputTitle.value == '' || inputPrice.value == '' || inputThumb.value == '') {
    alert('Por favor complete el formulario para agregar un nuevo producto.')
  } else {
    const newProd = {
      "title": inputTitle.value,
      "price": inputPrice.value,
      "thumbnail": inputThumb.value
    };
    agregarProducto(`${URL_BASE}/api/productos`, newProd)
    .then(() => {
      socket.emit('postProduct');
      inputTitle.value = '';
      inputPrice.value = '';
      inputThumb.value = '';
    }).catch(error => {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
  }
  return false;
}

// Actualizar un producto
function updateProduct(e) {
  const inputID = document.getElementById('idUp');
  const inputTitle = document.getElementById('titleUp');
  const inputPrice = document.getElementById('priceUp');
  const inputThumb = document.getElementById('thumbnailUp');
  if (inputID.value == "") {
    alert('Por favor ingresa el ID del producto a actualizar.')
  }  else if (inputTitle.value == "" && inputPrice.value == "" && inputThumb.value == "") {
    alert('Por favor seleccione algun campo para actualizar.')
  } else {
    const newProd = {};
    if (inputTitle.value != "") {
      newProd.title = inputTitle.value;
    }
    if (inputPrice.value != "") {
      newProd.price = inputPrice.value;
    }
    if (inputThumb.value != "") {
      newProd.thumbnail = inputThumb.value;
    }
    actualizarProducto(`${URL_BASE}/api/productos/actualizar/${inputID.value}`, newProd)
    .then(() => {
      socket.emit('updateProduct');
      inputID.value = '';
      inputTitle.value = '';
      inputPrice.value = '';
      inputThumb.value = '';
    }).catch(error => {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
  }
  return false;
}

// Eliminar producto.
function deleteProduct(e) {
  const inputID = document.getElementById('id');
  if (inputID.value == '') {
    alert('Por favor complete el formulario para eliminar el producto.')
  } else {
    eliminarProducto(`${URL_BASE}/api/productos/borrar/${inputID.value}`)
    .then(() => {
      socket.emit('deleteProduct');
      inputID.value = '';
    }).catch(error => {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
  }
  return false;
}

// Funcion para hacer el POST de producto
async function agregarProducto(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

// Funcion para hacer el PUT de producto
async function actualizarProducto(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

// Funcion para hacer el DELETE de producto
async function eliminarProducto(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'DELETE'
  });
  return response.json();
}