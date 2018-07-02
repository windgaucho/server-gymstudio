import _ from 'lodash';
import knex from './conexion';

class TipoAbono {
  mapear(obj) {
    const objMapeado = {
      idSucursal: obj.id_sucursal,
      id: obj.id,
      nombre: obj.nombre,
      precio: obj.precio,
    };

    return objMapeado;
  }

  getTiposAbonos(idSucursal) {
    const query = knex.select()
      .whereNull('fecha_baja')
      .andWhere('id_sucursal', '=', idSucursal)
      .from('tipos_abonos')
      .orderBy('nombre', 'asc');

    return query.then((filas) => {
      const filasMapeadas = [];
      filas.forEach((fila) => {
        filasMapeadas.push(this.mapear(fila));
      });
      return filasMapeadas;
    });
  }

  getTipoAbono(id) {
    const query = knex.select()
      .from('tipos_abonos')
      .whereNull('fecha_baja')
      .andWhere({ id });

    return query.then((fila) => {
      if (_.isEmpty(fila)) return {};
      return this.mapear(fila[0]);
    });
  }

  async create(tipoAbono) {
    const fecha = new Date();
    const id = await knex('tipos_abonos').insert({
      nombre: tipoAbono.nombre,
      id_sucursal: tipoAbono.idSucursal,
      precio: tipoAbono.precio,
      fecha_alta: fecha,
      fecha_actualizacion: fecha,
    });
    return this.getTipoAbono(id[0]);
  }

  async update(tipoAbono) {
    const fecha = new Date();
    await knex('tipos_abonos')
      .where('id', tipoAbono.id)
      .update({
        nombre: tipoAbono.nombre,
        id_sucursal: tipoAbono.idSucursal,
        precio: tipoAbono.precio,
        fecha_actualizacion: fecha,
      });
    return this.getTipoAbono(tipoAbono.id);
  }

  async remove(id) {
    const fecha = new Date();
    await knex('tipos_abonos')
      .where('id', id)
      .update({
        fecha_actualizacion: fecha,
        fecha_baja: fecha,
      });
    return this.getTipoAbono(id);
  }
}

export default TipoAbono;
