import knex from './conexion';

class Cliente {
  mapear(obj) {
    let objMapeado = {};
    if (obj) {
      objMapeado = {
        id: obj.id,
        apellido: obj.apellido,
        nombre: obj.nombre,
        docId: obj.doc_id,
        email: obj.email,
        telefono: obj.telefono,
        domicilio: obj.domicilio,
        contacto: obj.contacto,
        sexo: obj.sexo,
        fechaNacimiento: obj.fecha_nacimiento,
        fechaIngreso: obj.fecha_ingreso,
        fechaVencimiento: obj.fecha_vencimiento,
        idSucursal: obj.id_sucursal,
        idTipoAbono: obj.id_tipo_abono,
        observaciones: obj.observaciones,
      };
    }

    return objMapeado;
  }

  getCliente(id) {
    const query = knex.select()
      .from('clientes')
      .whereNull('fecha_baja')
      .andWhere({ id });

    return query.then((fila) => {
      if (fila.length === 0) return {};
      return this.mapear(fila[0]);
    });
  }

  async buscarxApyn(idSucursal, apyn) {
    const query = knex.select()
      .from('clientes')
      .whereNull('fecha_baja')
      .andWhere('id_sucursal', '=', idSucursal)
      .orderByRaw('apellido, nombre');

    const palabras = apyn.split(' ');
    palabras.map(palabra => (
      query.whereRaw(`concat(apellido, ' ', nombre) like '%${palabra.toUpperCase()}%'`)
    ));

    const clientes = await query.then((filas) => {
      const filasMapeadas = [];
      filas.forEach((fila) => {
        filasMapeadas.push(this.mapear(fila));
      });
      return filasMapeadas;
    });

    return clientes;
  }

  async create(cliente) {
    const fecha = new Date();
    const id = await knex('clientes').insert({
      id_sucursal: cliente.idSucursal,
      id_tipo_abono: cliente.idTipoAbono,
      apellido: cliente.apellido.toUpperCase(),
      nombre: cliente.nombre.toUpperCase(),
      doc_id: cliente.docId,
      domicilio: cliente.domicilio,
      sexo: cliente.sexo,
      fecha_nacimiento: cliente.fechaNacimiento,
      fecha_ingreso: cliente.fechaIngreso,
      telefono: cliente.telefono,
      contacto: cliente.contacto,
      email: cliente.email,
      fecha_alta: fecha,
      fecha_actualizacion: fecha,
    });
    return this.getCliente(id[0]);
  }

  async update(cliente) {
    const fecha = new Date();
    await knex('clientes')
      .where('id', cliente.id)
      .update({
        id_sucursal: cliente.idSucursal,
        apellido: cliente.apellido.toUpperCase(),
        nombre: cliente.nombre.toUpperCase(),
        doc_id: cliente.docId,
        domicilio: cliente.domicilio,
        sexo: cliente.sexo,
        fecha_nacimiento: cliente.fechaNacimiento,
        fecha_ingreso: cliente.fechaIngreso,
        fecha_vencimiento: cliente.fechaVencimiento,
        telefono: cliente.telefono,
        contacto: cliente.contacto,
        email: cliente.email,
        fecha_actualizacion: fecha,
      });
    return this.getCliente(cliente.id);
  }

  async remove(id) {
    const fecha = new Date();
    await knex('clientes')
      .where('id', id)
      .update({
        fecha_baja: fecha,
        fecha_actualizacion: fecha,
      });
    return this.getCliente(id);
  }
}

export default Cliente;
