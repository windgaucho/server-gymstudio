const clienteSchema = [`
type Cliente {
  idSucursal: Int
  id: Int
  docId: String
  apellido: String
  nombre: String
  domicilio: String
  telefono: String
  contacto: String
  mail: String
  Sexo: String
  fechaNacimiento: Date
  fechaIngreso: Date
  fechaVencimiento: Date
  observaciones: String
  idTipoAbono: Int
  tipoAbono: TipoAbono
}

input InputCliente {
  idSucursal: Int
  id: Int
  docId: String
  apellido: String
  nombre: String
  domicilio: String
  telefono: String
  contacto: String
  mail: String
  Sexo: String
  fechaNacimiento: Date
  fechaIngreso: Date
  observaciones: String
  idTipoAbono: Int
}

`];

export default clienteSchema;
