const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: ".env" });
require("./Configs/Postgres.js");
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: ".env" });
}
app.get("/", (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "Tài Đẹp trai ",
    timestamp: Date.now(),
  };
  return res.send(healthcheck);
});
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`server is listening on port:http://localhost:${PORT}`)
);
