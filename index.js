const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
function readBooks() {
    const data = fs.readFileSync("libros.json", "utf-8");
    return JSON.parse(data);
}

function saveBooks(libros) {
    fs.writeFileSync("libros.json", JSON.stringify(libros, null, 2));
}

app.get("/libros", (req, res) => {
    const libros = readBooks();
    res.json(libros);
});

app.put("/libros/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const dataLibro = req.body;
    const libros = readBooks();
    const librosActualizados = libros.find((book) => book.id === id);

    if (librosActualizados) {
        librosActualizados.titulo = dataLibro.titulo;
        librosActualizados.autor = dataLibro.autor;
        librosActualizados.anio = dataLibro.anio;
        librosActualizados.disponible = dataLibro.disponible;
        saveBooks(libros);
        res.json({ status: 200, mensaje: "Libro actualizado", librosActualizados });
    } else {
        res.status(404).json({ status: 404, mensaje: "libro no encontrado" });
    }
});

app.listen(PORT, () => {
    console.log(`Server activo en http://localhost:${PORT}`);
});
