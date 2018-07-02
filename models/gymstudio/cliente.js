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
      };
    }

    return objMapeado;
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
}

export default Cliente;
