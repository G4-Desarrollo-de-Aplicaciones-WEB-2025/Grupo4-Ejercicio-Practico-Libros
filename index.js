
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

