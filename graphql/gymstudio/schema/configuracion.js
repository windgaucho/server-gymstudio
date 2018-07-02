const configSchema = [`
type Sucursal {
  id: Int
  nombre: String
  direccion: String
  idCiudad: String
  ciudad: Ciudad
}

type Ciudad {
  id: Int
  nombre: String
}

type Rubro {
  idSucursal: Int
  id: Int
  nombre: String
}

input InputRubro {
  idSucursal: Int
  id: Int
  nombre: String
}

type Articulo {
  idSucursal: Int
  id: Int
  nombre: String
  idRubro: Int
  precio: Float
  rubro: Rubro
}

input InputArticulo {
  idSucursal: Int
  id: Int
  nombre: String
  idRubro: Int
  precio: Float
}

input InputSucursal {
  id: Int
  nombre: String
  direccion: String
  idCiudad: Int
}

type TipoAbono {
  idSucursal: Int
  id: Int
  nombre: String
  precio: Float
}

input InputTipoAbono {
  idSucursal: Int
  id: Int
  nombre: String
  precio: Float
}

`];

export default configSchema;
