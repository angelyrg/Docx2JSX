# Docx2JSX

🎯 **Docx2JSX** es una herramienta web para convertir archivos `.docx` (Microsoft Word) en código HTML/JSX que puede integrarse fácilmente en proyectos React.

Ideal para importar contenido largo como **términos y condiciones**, políticas, contratos, documentación, etc., conservando el formato básico y la estructura.

---

## ✨ Características

- ✅ Soporte para archivos `.docx` generados en Microsoft Word.
- ✅ Conversión limpia usando [Mammoth.js](https://github.com/mwilliamson/mammoth.js).
- ✅ Previsualización instantánea del contenido.
- ✅ Botón para copiar el código generado.
- ✅ Alternar entre **formato plano** y **formato legible (indented)**.
- ✅ Interfaz simple, sin dependencias pesadas.


## 🚀 Cómo usar localmente

### 1. Clona el repositorio

```bash
git clone https://github.com/angelyrg/Docx2JSX
cd docx2jsx
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Ejecuta la app

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🧰 Tecnologías usadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Mammoth.js](https://github.com/mwilliamson/mammoth.js)

---

## 🗂 Estructura del proyecto

```
src/
├── App.jsx         # Lógica principal y UI
├── main.jsx        # Punto de entrada
└── index.css       # Estilos globales
```

---


## 🙌 Contribuciones

¡Las contribuciones son bienvenidas!  
Puedes abrir issues, sugerencias o pull requests para mejorar esta herramienta.

---

## ✍ Autor

Creado por [Angel Yaranga](https://github.com/angelyrg)

---

## 📌 Nota

Esta herramienta no incluye estilos avanzados ni conversión de estilos complejos (colores, márgenes, fuentes). Está enfocada en una conversión **estructural limpia**, ideal para texto legal o contenido estático.
