const resolvers = {
  Query: {
    cliente(root, args, context) {
      return context.Cliente.getCliente(args.id);
    },
    buscarxApyn(root, { idSucursal, apyn }, context) {
      return context.Cliente.buscarxApyn(idSucursal, apyn);
    },
  },
  Cliente: {
    tipoAbono(cliente, root, context) {
      return context.TipoAbono.getTipoAbono(cliente.idTipoAbono);
    },
  },
  Mutation: {
    createCliente(root, { cliente }, context) {
      return context.Cliente.create(cliente);
    },
    updateCliente(root, { cliente }, context) {
      return context.Cliente.update(cliente);
    },
    removeCliente(root, { id }, context) {
      return context.Cliente.remove(id);
    },
  },
};

export default resolvers;
