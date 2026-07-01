// users.js
// What this is: a mock signed-in user record, used to fake an authenticated
// session on the frontend (header avatar, dashboard) until JWT auth from the
// Node/Mongo backend is wired up via services/users.js.

const users = [
  {
    id: "u001",
    name: "Ahmed Al-Harbi",
    email: "ahmed@example.com",
    phone: "+966500000000",
    password: "123456",
    avatar: null,
  },
];

export default users;
