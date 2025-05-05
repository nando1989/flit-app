const ROUTES = {
  NO_AUTH: {
    SIGN_IN: '/login',
    FORGOT_PASSWORD: '/lembrar-senha',
  },

  AUTHENTICATED: {
    HOME: '/home',
    EMPLOYEES: '/funcionarios',
    EMPLOYEES_DETAILS: '/funcionario-detalhes',
    USERS: '/usuarios',
  },
};

const FIREBASE = {
  COLLECTIONS: {
    USERS: 'usuarios',
    EMPLOYEES: 'employees',
  },
};

export { ROUTES, FIREBASE };
