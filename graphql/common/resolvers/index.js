import { Kind } from 'graphql/language';

export const parseDateLiteral = (ast) => {
  if (ast.kind === Kind.INT) {
    return parseInt(ast.value, 10);
  }
  return null;
};

export const parseJSONLiteral = (ast) => {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT: {
      const value = Object.create(null);
      ast.fields.forEach((field) => {
        value[field.name.value] = parseJSONLiteral(field.value);
      });

      return value;
    }
    case Kind.LIST:
      return ast.values.map(parseJSONLiteral);
    default:
      return null;
  }
};

const resolvers = {
  JSON: {
    __parseLiteral: parseJSONLiteral,
    __serialize: value => value,
    __parseValue: value => value,
  },
  Date: {
    __parseLiteral: parseDateLiteral,
    __parseValue: value => new Date(value),
    __serialize: value => value.getTime(),
  },
};

export default resolvers;
