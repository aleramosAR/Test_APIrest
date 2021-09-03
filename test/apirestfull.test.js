import supertest from 'supertest';
import { expect } from 'chai';

const request = supertest('http://localhost:8080/api/productos')

describe('Testeo de API restfull', () => {

  describe('Testeo de la API de productos.', () => {
    it('Reinicio de base de datos', async () => {
      
      const response = await request.post('/destroy');
      
      // Chequeo si el status es 200 (OK)
      expect(response.status).to.eql(200);
    })
    it('Creacion de un nuevo producto (POST)', async () => {
      // Defino un producto a crear
      const newProducto = {"title": "Bananas", "price": 90, "thumbnail": "10"}

      const response = await request.post('/').send(newProducto);
      const producto = response.body;

      // Chequeo si el status es 201 (Created)
      expect(response.status).to.eql(201);

      // Chequeo que el producto creado tenga los campos correctos.
      expect(producto).to.include.keys('title', 'price', 'thumbnail');

      // Chequeo que los campos tengan los valores correctos.
      expect(producto.title).to.eql('Bananas');
      expect(producto.price).to.eql(90);
      expect(producto.thumbnail).to.eql('10');
    })
    it('Chequeo que haya 1 producto en la base (GET)', async () => {
      
      const response = await request.get('/');
      
      // Chequeo si el status es 200 (OK)
      expect(response.status).to.eql(200);
      
      // Chequeo que haya un producto en el listado.
      expect(response.body.length).to.eql(1);
    })
    it('Modificacion en el precio del primer producto (PUT)', async () => {

      // Tomo el ID del primer producto para luego modificarlo.
      let productos = await request.get('/');
      const id = productos.body[0]._id;

      // Modifico el precio del producto.
      const response = await request.put(`/actualizar/${id}`).send({"price": 105});

      // Chequeo que haya modificado 1 item.
      expect(response.body.updatedProd.nModified).to.eql(1);

      // Vuelvo a cargar el primer producto para chequear si se hizo la modificacion.
      productos = await request.get('/');
      const producto = productos.body[0];

      // Chequeo que el precio se haya modificado.
      expect(producto.price).to.eql(105);
    })
    it('Eliminacion de un item (DEL)', async () => {

      // Tomo el ID del primer producto para luego eliminarlo.
      let productos = await request.get('/');
      const id = productos.body[0]._id;

      // Modifico el precio del producto.
      const response = await request.delete(`/borrar/${id}`);

      // Chequeo si el status es 202 (Accepted)
      expect(response.status).to.eql(202);

      // Cheque que ahora la carga de productos de productos devuelva 404 (No encontrados)
      productos = await request.get('/');
      expect(productos.status).to.eql(404);
    })
  })

});