import { login, registrar } from '../../../services/auth';

const resolvers = {
  Query: {
    user(root, args, context) {
      const { req } = context;
      return req.user;
    },
  },
  Mutation: {
    registrar(root, { userId, password, apellido, nombre }, context) {
      const { req } = context;
      return registrar(userId, password, apellido, nombre, req);
    },
    login(root, { userId, password }, context) {
      const { req } = context;
      return login(userId, password, req);
    },
    logout(root, args, context) {
      const { req } = context;
      const { user } = req;
      req.logout();
      return user;
    },
  },
};

export default resolvers;
