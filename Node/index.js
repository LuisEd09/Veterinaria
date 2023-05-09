const express = require('express');
const morgan = require('morgan');
const app = express();
const hematologia = require('./Routes/hematologia');
const parasitologia = require('./Routes/parasitologia');
const urianalisis = require('./Routes/urianalisis');
const propietario = require('./Routes/propietario');
const veterinario = require('./Routes/veterinario')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) =>{
    return res.status(200).send("API");
})

app.use("/veterinario", veterinario);
app.use("/propietario", propietario);
app.use("/hematologia", hematologia);
app.use("/parasitologia", parasitologia);
app.use("/urianalisis", urianalisis);

app.use((req, res, next) =>{
    return res.status(404).json({code: 404, message: "URL no encontrada "});
})
app.listen(process.env.PORT || 3000, () => {
    console.log("server is running ..");
})
