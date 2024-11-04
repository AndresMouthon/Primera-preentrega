import express from 'express';
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { router as carRouter } from './routes/carRouter.js';
import { router as productsRouter } from './routes/productRouter.js';
import { router as vistasRouter } from './routes/vistasRouter.js';

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use("/", vistasRouter)

app.use("/api/products", productsRouter);
app.use("/api/carts", carRouter);

// app.get('/', (req, res) => {
//     res.setHeader('Content-Type', 'text/plain');
//     res.status(200).send('OK');
// })

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

const io = new Server(server);

io.on('connection', socket => {
    console.log(`Se conectó un cliente con id ${socket.id}`);
    socket.on('accionRegistrarRealizada', () => {
        io.emit('refreshRegistrar');
    });
    socket.on('accionEliminarRealizada', () => {
        io.emit('refreshDelete');
    });
});