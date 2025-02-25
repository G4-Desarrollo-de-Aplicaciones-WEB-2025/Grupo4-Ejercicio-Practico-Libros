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




app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
