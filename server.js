const app = require("./app.js");

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Running server, http://localhost:${PORT}`);
})