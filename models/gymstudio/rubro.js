import _ from 'lodash';
import knex from './conexion';

class Rubro {
  mapear(obj) {
    const objMapeado = {
      idSucursal: obj.id_sucursal,
      id: obj.id,
      nombre: obj.nombre,
    };

    return objMapeado;
  }

  getRubros(idSucursal) {
    const query = knex.select()
      .whereNull('fecha_baja')
      .andWhere('id_sucursal', '=', idSucursal)
      .from('rubros')
      .orderBy('nombre', 'asc');

    return query.then((filas) => {
      const filasMapeadas = [];
      filas.forEach((fila) => {
        filasMapeadas.push(this.mapear(fila));
      });
      return filasMapeadas;
    });
  }

  getRubro(id) {
    const query = knex.select()
      .from('rubros')
      .whereNull('fecha_baja')
      .andWhere({ id });

    return query.then((fila) => {
      if (_.isEmpty(fila)) return {};
      return this.mapear(fila[0]);
    });
  }

  async create(rubro) {
    const fecha = new Date();
    const id = await knex('rubros').insert({
      nombre: rubro.nombre,
      id_sucursal: rubro.idSucursal,
      fecha_alta: fecha,
      fecha_actualizacion: fecha,
    });
    return this.getRubro(id[0]);
  }

  async update(rubro) {
    const fecha = new Date();
    await knex('rubros')
      .where('id', rubro.id)
      .update({
        nombre: rubro.nombre,
        id_sucursal: rubro.idSucursal,
        fecha_actualizacion: fecha,
      });
    return this.getRubro(rubro.id);
  }

  async remove(id) {
    const fecha = new Date();
    await knex('rubros')
      .where('id', id)
      .update({
        fecha_actualizacion: fecha,
        fecha_baja: fecha,
      });
    return this.getRubro(id);
  }
}

export default Rubro;
