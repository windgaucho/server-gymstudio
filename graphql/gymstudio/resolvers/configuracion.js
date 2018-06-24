const resolvers = {
  Query: {
    sucursales(root, args, context) {
      return context.Sucursal.getSucursales();
    },
    ciudades(root, args, context) {
      return context.Ciudad.getCiudades();
    },
  },
  Sucursal: {
    ciudad(sucursal, root, context) {
      return context.Ciudad.getCiudad(sucursal.idCiudad);
    },
  },
  Mutation: {
    createSucursal(root, { sucursal }, context) {
      return context.Sucursal.create(sucursal);
    },
    updateSucursal(root, { sucursal }, context) {
      return context.Sucursal.update(sucursal);
    },
    removeSucursal(root, { id }, context) {
      return context.Sucursal.remove(id);
    },
    /*
    createRubro(root, { rubro }, context) {
      return context.Rubro.create(rubro);
    },
    updateRubro(root, { rubro }, context) {
      return context.Rubro.update(rubro);
    },
    removeRubro(root, { id }, context) {
      return context.Rubro.remove(id);
    },
    createArticulo(root, { articulo }, context) {
      return context.Articulo.create(articulo);
    },
    updateArticulo(root, { articulo }, context) {
      return context.Articulo.update(articulo);
    },
    removeArticulo(root, { id }, context) {
      return context.Articulo.remove(id);
    },
    */
  },
};

export default resolvers;
