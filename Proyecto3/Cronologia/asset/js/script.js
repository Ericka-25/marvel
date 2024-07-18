
document.addEventListener("DOMContentLoaded", () => {
    // Variable para almacenar todas las películas
    let allMovies = [];

    // Fetch para obtener los datos JSON
    fetch('/Cronologia/asset/data/data2.JSON')
        .then(response => response.json())
        .then(data => {
            allMovies = data; // Guardar las películas obtenidas
            displayMovies(data); // Mostrar las películas al cargar la página
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

    // Event listener para el formulario de búsqueda
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        const query = document.getElementById('search-input').value.toLowerCase(); // Obtener el valor de búsqueda y convertirlo a minúsculas
        const filteredMovies = filterMovies(allMovies, query); // Filtrar las películas según la búsqueda
        displayMovies(filteredMovies); // Mostrar las películas filtradas
    });

    // Función para filtrar las películas
    function filterMovies(movies, query) {
        const filtered = {};
        for (const phase in movies) {
            // Filtrar las películas que coinciden con la búsqueda en el nombre o sinopsis
            filtered[phase] = movies[phase].filter(movie => movie.nombre.toLowerCase().includes(query) || movie.sinopsis.toLowerCase().includes(query));
        }
        return filtered;
    }

    // Función para mostrar las películas
    function displayMovies(movies) {
        const timelineContainer = document.getElementById("timeline-container");
        timelineContainer.innerHTML = ''; // Limpiar resultados anteriores

        for (const phase in movies) {
            const phaseElement = document.createElement("div");
            phaseElement.className = "phase";
            phaseElement.textContent = phase;
            timelineContainer.appendChild(phaseElement);

            movies[phase].forEach(movie => {
                const movieElement = document.createElement("div");
                movieElement.className = "timeline-item";
                movieElement.innerHTML = `
                    <img class="imagen" src="${movie.poster}" alt="${movie.nombre}">
                    <h2>${movie.nombre} (${movie.año})</h2>
                    <p>${movie.sinopsis}</p>
                    <p><strong>Protagonistas:</strong> ${movie.protagonistas}</p>
                    <p><strong>Dirigida por:</strong> ${movie.dirigida_por}</p>
                `;
                timelineContainer.appendChild(movieElement);
            });
        }
        
        // Animación de la línea de tiempo
        var _items = document.querySelectorAll(".timeline-item");
        _items.forEach(element => {
            if (element.offsetTop < 300) {
                element.classList.add('_show');
            }
        });

        window.addEventListener("scroll", () => {
            var scroll = document.documentElement.scrollTop;
            var items = document.querySelectorAll(".timeline-item");
            items.forEach(elem => {
                if (elem.offsetTop - window.innerHeight / 2 < scroll) {
                    elem.classList.remove('_hide');
                    elem.classList.add('_show');
                } else {
                    elem.classList.remove('_show');
                    elem.classList.add('_hide');
                }
            });
        });
    }
});

