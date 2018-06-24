import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import authSchena from './graphql/auth/schema';
import authResolvers from './graphql/auth/resolvers';
import commonSchema from './graphql/common/schema';
import commonResolvers from './graphql/common/resolvers';
import configSchema from './graphql/gymstudio/schema/configuracion';
import configResolvers from './graphql/gymstudio/resolvers/configuracion';

const rootSchema = [`
type Query {
  user: User

  ciudades: [Ciudad]
  sucursales: [Sucursal]
}

type Mutation {
  registrar(userId: String!, password: String!, apellido: String!, nombre: String!): User
  login(userId: String!, password: String!): User
  logout: User

  createSucursal(sucursal: InputSucursal!): Sucursal
  updateSucursal(sucursal: InputSucursal!): Sucursal
  removeSucursal(id: Int!): Boolean
}

schema {
  query: Query,
  mutation: Mutation
}
`];

const schema = [...rootSchema, ...authSchena, ...commonSchema, ...configSchema];
const resolvers = merge(authResolvers, commonResolvers, configResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
