document.addEventListener('DOMContentLoaded', function() {
    fetch('assets/data/Data.json')
        .then(response => response.json())
        .then(data => {
            const contenedor = document.getElementById('Data');
            let cardCount = 0;
            const cardsPerTitle = 2; // Número de tarjetas antes de agregar un nuevo título

            // Array de títulos a usar
            const titles = [
                
                "Películas del Año 2011",
                "Películas del Año 2013",
                "Películas del Año 2014",
                 "Películas del Año 2015"
            ];

            // Índice para rastrear el título actual del array
            let titleIndex = 0;

            data.forEach((item, index) => {
                // Inserta un título cada `cardsPerTitle` tarjetas
                if (cardCount % cardsPerTitle === 0) {
                    if (cardCount > 0) {
                        // Solo agregar un título si no es la primera tarjeta
                        const title = document.createElement('h3');
                        title.classList.add('text-center', 'my-4'); // Ajustar el estilo según sea necesario
                        title.textContent = titles[titleIndex] || "Título por defecto";
                        contenedor.appendChild(title);

                        // Pasar al siguiente título o volver al principio
                        titleIndex = (titleIndex + 1) % titles.length;
                    }
                }

                const col = document.createElement('div');
                col.classList.add('col-md-4');

                const card = document.createElement('div');
                card.classList.add('card');

                // Asigna una clase única a cada tarjeta
                card.classList.add(`card-${(index % 3) + 1}`); // Alterna entre card-1, card-2, card-3

                const img = document.createElement('img');
                img.src = item.imagen;
                img.alt = `Imagen de ${item.nombre}`;
                img.classList.add('card-img-top');

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const cardTitle = document.createElement('h5');
                cardTitle.classList.add('card-title');
                cardTitle.textContent = item.nombre;

                const cardText = document.createElement('p');
                cardText.classList.add('card-text');
                cardText.innerHTML = `
                    <strong>Año:</strong> ${item.Año} <br>
                    <strong>Sinopsis:</strong> ${item.sinopsis}
                `;

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
                card.appendChild(img);
                card.appendChild(cardBody);
                col.appendChild(card);

                contenedor.appendChild(col);

                cardCount++;
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));

 

});
