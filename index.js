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
app.get("/libros", (req, res) => {
    try {
        const books = readBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Error al leer los libros." });
    }
});


// endpoint POST para agregar un libro nuevo
app.post("/libros", (req, res) => {
    const books = readBooks(); 
    const { id, titulo, autor, anio, disponible } = req.body; 

    
    if (!id || !titulo || !autor || !anio || disponible === undefined) {
        return res.status(400).json({ error: "ERROR Todos los campos (id, título, autor, año, disponibilidad) son obligatorios." });
    }

    if (books.some(book => book.id === id)) {
        return res.status(400).json({ error: "Este ID ya existe, por favor elija uno diferente." });
    }

    const newBook = { id, titulo, autor, anio, disponible };
    books.push(newBook);
    saveBooks(books); 
    
    res.status(201).json({ message: "¡El Libro se agrego correctamente!", book: newBook });
});



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
