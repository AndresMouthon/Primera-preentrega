import express from 'express';
import { engine } from "express-handlebars";
// import { config } from 'process';
import passport from "passport";
import { Server } from "socket.io";
import { config } from './config/config.js';
import "./config/passport.config.js";
import { conectarDB } from './connDB.js';
import { router as carRouter } from './routes/carRouter.js';
import { router as productsRouter } from './routes/productRouter.js';
import { router as usersRouter } from './routes/userRouter.js';
import { router as vistasRouter } from './routes/vistasRouter.js';

const PORT = config.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"))

app.use(passport.initialize());
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use("/", vistasRouter)

app.use("/api/products", productsRouter);
app.use("/api/carts", carRouter);
app.use("/api/users", usersRouter);

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

conectarDB(config.MONGO_URL, config.DB_NAME)