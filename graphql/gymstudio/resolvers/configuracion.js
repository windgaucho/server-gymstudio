const resolvers = {
  Query: {
    sucursales(root, args, context) {
      return context.Sucursal.getSucursales();
    },
    sucursal(root, args, context) {
      return context.Sucursal.getSucursal(args.id);
    },
    ciudades(root, args, context) {
      return context.Ciudad.getCiudades();
    },
    rubros(root, args, context) {
      return context.Rubro.getRubros(args.idSucursal);
    },
    rubro(root, args, context) {
      return context.Rubro.getRubro(args.id);
    },
    articulos(root, args, context) {
      return context.Articulo.getArticulos(args.idSucursal);
    },
    articulo(root, args, context) {
      return context.Articulo.getArticulo(args.id);
    },
    tiposAbonos(root, args, context) {
      return context.TipoAbono.getTiposAbonos(args.idSucursal);
    },
    tipoAbono(root, args, context) {
      return context.TipoAbono.getTipoAbono(args.id);
    },
  },
  Sucursal: {
    ciudad(sucursal, root, context) {
      return context.Ciudad.getCiudad(sucursal.idCiudad);
    },
  },
  Articulo: {
    rubro(articulo, root, context) {
      return context.Rubro.getRubro(articulo.idRubro);
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
    createTipoAbono(root, { tipoAbono }, context) {
      return context.TipoAbono.create(tipoAbono);
    },
    updateTipoAbono(root, { tipoAbono }, context) {
      return context.TipoAbono.update(tipoAbono);
    },
    removeTipoAbono(root, { id }, context) {
      return context.TipoAbono.remove(id);
    },
  },
};

export default resolvers;
