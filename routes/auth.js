const app = require("../app");
const { register, login } = require("../controllers/auth");

app.post("/register", register)

app.post("/login", login)