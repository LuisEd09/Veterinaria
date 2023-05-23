const express = require('express');
const morgan = require('morgan');
const app = express();

const hematologia = require('./Routes/hematologia');
const parasitologia = require('./Routes/parasitologia');
const urianalisis = require('./Routes/urianalisis');
const propietario = require('./Routes/propietario');
const veterinario = require('./Routes/veterinario');

const cors = require('./middleware/cors');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const auth = require('./middleware/auth');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);

app.use("/veterinario", veterinario);
app.use("/propietario", propietario);

app.use(auth);
app.use("/hematologia", hematologia);
app.use("/parasitologia", parasitologia);
app.use("/urianalisis", urianalisis);
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running ..");
})
