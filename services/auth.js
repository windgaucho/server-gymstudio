import passport from 'passport';
const mongoose = require('mongoose');

const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy({ usernameField: 'userId' }, (userId, password, done) => {
  User.findOne({ userId: userId.toLowerCase() }, (err, user) => {
    if (err) return done(err);
    if (!user) {
      return done(null, false);
    }
    return user.comparePassword(password, (errPwd, isMatch) => {
      if (errPwd) {
        return done(errPwd);
      }
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false);
    });
  });
}));

/**
 * Registrar un nuevo usuario.
 */
export const registrar = (userId, password, apellido, nombre, req) => {
  if (!userId || !password) {
    throw new Error('Debe ingresar usuario y contraseña.');
  }
  const user = new User({
    userId, password, apellido, nombre,
  });

  return User.findOne({ userId })
    .then((existeUserId) => {
      if (existeUserId) {
        throw new Error('El usuario que intenta agregar ya existe.');
      }
      return user.save();
    })
    .then((nuevoUser) => {
      return new Promise((resolve, reject) => {
        req.logIn(nuevoUser, (err) => {
          if (err) {
            reject(err);
          }
          resolve(nuevoUser);
        });
      });
    });
};

/**
 * Login de usuario
 */
export const login = (userId, password, req) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) {
        reject(Error('Las credenciales ingresadas no son válidas.'));
      }
      req.login(user, () => resolve(user));
    })({ body: { userId, password } });
  });
};
