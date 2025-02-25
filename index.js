const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

// Función para leer los libros desde el archivo
function readBooks() {
    const data = fs.readFileSync("libros.json", "utf-8");
    return JSON.parse(data);
}

// Función para escribir los libros en el archivo
function saveBooks(books) {
    fs.writeFileSync("libros.json", JSON.stringify(books, null, 2));
}

// endpoint GET para obtener libros



// endpoint POST para agregar un libro nuevo



//endpoint PUT para actualizar un libro 
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
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
