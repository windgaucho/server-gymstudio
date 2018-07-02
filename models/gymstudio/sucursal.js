import _ from 'lodash';
import knex from './conexion';

class Sucursal {
  mapear(obj) {
    const objMapeado = {
      id: obj.id,
      nombre: obj.nombre,
      direccion: obj.direccion,
      idCiudad: obj.id_ciudad,
    };
    return objMapeado;
  }

  getSucursales() {
    const query = knex.select()
      .whereNull('fecha_baja')
      .from('sucursales')
      .orderBy('nombre', 'asc');

    return query.then((filas) => {
      const filasMapeadas = [];
      filas.forEach((fila) => {
        filasMapeadas.push(this.mapear(fila));
      });
      return filasMapeadas;
    });
  }

  getSucursal(id) {
    const query = knex.select()
      .from('sucursales')
      .where({ id })
      .whereNull('fecha_baja');

    return query.then((fila) => {
      if (_.isEmpty(fila)) return {};
      return this.mapear(fila[0]);
    });
  }

  async create(sucursal) {
    const fecha = new Date();
    const id = await knex('sucursales').insert({
      nombre: sucursal.nombre,
      direccion: sucursal.direccion,
      id_ciudad: sucursal.idCiudad,
      fecha_alta: fecha,
      fecha_actualizacion: fecha,
    });
    return this.getSucursal(id[0]);
  }

  async update(sucursal) {
    const fecha = new Date();
    await knex('sucursales')
      .where('id', sucursal.id)
      .update({
        nombre: sucursal.nombre,
        direccion: sucursal.direccion,
        id_ciudad: sucursal.idCiudad,
        fecha_actualizacion: fecha,
      });
    return this.getSucursal(sucursal.id);
  }

  async remove(id) {
    const fecha = new Date();
    await knex('sucursales')
      .where('id', id)
      .update({
        estado: 'E',
        fecha_actualizacion: fecha,
        fecha_baja: fecha,
      });
    return this.getSucursal(id);
  }
}

export default Sucursal;
