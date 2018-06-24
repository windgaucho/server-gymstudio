import _ from 'lodash';
import knex from './conexion';

class Ciudad {
  mapear(obj) {
    const objMapeado = {
      idSucursal: obj.id_sucursal,
      id: obj.id,
      nombre: obj.nombre,
    };

    return objMapeado;
  }

  getCiudades() {
    const query = knex.select()
      .whereRaw('fecha_baja is null')
      .from('ciudades')
      .orderBy('nombre', 'asc');

    return query.then((filas) => {
      const filasMapeadas = [];
      filas.forEach((fila) => {
        filasMapeadas.push(this.mapear(fila));
      });
      return filasMapeadas;
    });
  }

  getCiudad(id) {
    const query = knex.select()
      .from('ciudades')
      .where({ id })
      .andWhere('estado', '<>', 'E');

    return query.then((fila) => {
      if (_.isEmpty(fila)) return {};
      return this.mapear(fila[0]);
    });
  }

  async create(ciudad) {
    const fecha = new Date();
    const id = await knex('ciudades').insert({
      nombre: ciudad.nombre,
      fecha_alta: fecha,
      fecha_actualizacion: fecha,
    });
    return this.getCiudad(id[0]);
  }

  async update(ciudad) {
    const fecha = new Date();
    await knex('ciudades')
      .where('id', ciudad.id)
      .update({
        nombre: ciudad.nombre,
        fecha_actualizacion: fecha,
      });
    return this.getCiudad(ciudad.id);
  }

  async remove(id) {
    const fecha = new Date();
    await knex('ciudades')
      .where('id', id)
      .update({
        estado: 'E',
        fecha_actualizacion: fecha,
        fecha_baja: fecha,
      });
    return this.getciudad(id);
  }
}

export default Ciudad;
