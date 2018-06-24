/* eslint no-unused-vars:  */
import express from 'express';
import './models/auth';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import './services/auth';
import passport from 'passport';
import session from 'express-session';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import _ from './env';
import schema from './schema';

import Sucursal from './models/gymstudio/sucursal';
import Ciudad from './models/gymstudio/ciudad';

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const MongoStore = require('connect-mongo')(session);

const { GRAPHQL_ROUTE, GRAPHIQL_ROUTE, PORT, SERVER_URL, MONGO_URI } = process.env;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors(corsOptions));

mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Conectado a la instancia de mongodb.'))
  .on('error', error => console.log('Error al intentar conectar a mongodb:', error));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(GRAPHQL_ROUTE, bodyParser.json(), graphqlExpress((req) => {
  console.log('req', req.user);

  return {
    schema,
    context: {
      req,
      Sucursal: new Sucursal(),
      Ciudad: new Ciudad(),
    },
    debug: true,
  };
}));

// GraphiQL solo esta disponible en development.
if (GRAPHIQL_ROUTE) {
  app.use(GRAPHIQL_ROUTE, graphiqlExpress({ endpointURL: GRAPHQL_ROUTE }));
}

app.listen(PORT, () => {
  console.log(`GraphQL Server esta corriendo en ${SERVER_URL}:${PORT}${GRAPHQL_ROUTE}`); // eslint-disable-line no-console
  if (GRAPHIQL_ROUTE) {
    console.log(`La herramienta GraphiQL Server esta corriendo en ${SERVER_URL}:${PORT}${GRAPHIQL_ROUTE}`); // eslint-disable-line no-console
  }
});
