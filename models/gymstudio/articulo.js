import _ from 'lodash';
import knex from './conexion';

class Articulo {
  mapear(obj) {
    const objMapeado = {
      id: obj.id,
      idRubro: obj.id_rubro,
      idSucursal: obj.id_sucursal,
      nombre: obj.nombre,
      precio: obj.precio,
    };

    return objMapeado;
  }

  getArticulo(id) {
    const query = knex.select()
      .from('articulos')
      .whereNull('fecha_baja')
      .andWhere({ id });

    return query.then((fila) => {
      if (_.isEmpty(fila)) return {};
      return this.mapear(fila[0]);
    });
  }

  getArticulos(idSucursal) {
    const query = knex.select()
      .from('articulos')
      .whereNull('fecha_baja')
      .andWhere('id_sucursal', '=', idSucursal)
      .orderBy('nombre', 'asc');

    return query.then((filas) => {
      const filasMapeadas = [];
      filas.forEach((fila) => {
        filasMapeadas.push(this.mapear(fila));
      });
      return filasMapeadas;
    });
  }

  async create(articulo) {
    const fecha = new Date();
    const id = await knex('articulos').insert({
      id_sucursal: articulo.idSucursal,
      nombre: articulo.nombre,
      precio: articulo.precio,
      id_rubro: articulo.idRubro,
      fecha_alta: fecha,
      fecha_actualizacion: fecha,
    });
    return this.getArticulo(id[0]);
  }

  async update(articulo) {
    const fecha = new Date();
    await knex('articulos')
      .where('id', articulo.id)
      .update({
        nombre: articulo.nombre,
        precio: articulo.precio,
        id_rubro: articulo.idRubro,
        fecha_actualizacion: fecha,
      });
    return this.getArticulo(articulo.id);
  }

  async remove(id) {
    const fecha = new Date();
    await knex('articulos')
      .where('id', id)
      .update({
        estado: 'E',
        fecha_actualizacion: fecha,
        fecha_baja: fecha,
      });
    return this.getArticulo(id);
  }
}

export default Articulo;
