import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import authSchena from './graphql/auth/schema';
import authResolvers from './graphql/auth/resolvers';
import commonSchema from './graphql/common/schema';
import commonResolvers from './graphql/common/resolvers';
import configSchema from './graphql/gymstudio/schema/configuracion';
import configResolvers from './graphql/gymstudio/resolvers/configuracion';
import clienteSchema from './graphql/gymstudio/schema/gymstudio';
import clientesResolvers from './graphql/gymstudio/resolvers/gymstudio';

const rootSchema = [`
type Query {
  user: User

  ciudades: [Ciudad]
  sucursales: [Sucursal]
  sucursal(id: String!): Sucursal

  rubros(idSucursal: String!): [Rubro]
  rubro(id: String!): Rubro

  articulos(idSucursal: String!): [Articulo]
  articulo(id: String!): Articulo

  tiposAbonos(idSucursal: String!): [TipoAbono]
  tipoAbono(id: String!): TipoAbono

  cliente(id: Int): Cliente
  buscarxApyn(idSucursal: Int!, apyn: String!): [Cliente]
}

type Mutation {
  registrar(userId: String!, password: String!, apellido: String!, nombre: String!): User
  login(userId: String!, password: String!): User
  logout: User

  createSucursal(sucursal: InputSucursal!): Sucursal
  updateSucursal(sucursal: InputSucursal!): Sucursal
  removeSucursal(id: Int!): Boolean

  createRubro(rubro: InputRubro!): Rubro
  updateRubro(rubro: InputRubro!): Rubro
  removeRubro(id: Int!): Boolean

  createArticulo(articulo: InputArticulo!): Articulo
  updateArticulo(articulo: InputArticulo!): Articulo
  removeArticulo(id: Int!): Boolean

  createTipoAbono(tipoAbono: InputTipoAbono!): TipoAbono
  updateTipoAbono(tipoAbono: InputTipoAbono!): TipoAbono
  removeTipoAbono(id: Int!): Boolean

  createCliente(cliente: InputCliente!): Cliente
  updateCliente(cliente: InputCliente!): Cliente
  removeCliente(id: Int!): Boolean
}

schema {
  query: Query,
  mutation: Mutation
}
`];

const schema = [...rootSchema, ...authSchena, ...commonSchema, ...configSchema, ...clienteSchema];
const resolvers = merge(authResolvers, commonResolvers, configResolvers, clientesResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
