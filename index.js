class MovieDisplay {
    constructor(apiUrl, containerId) {
        this.apiUrl = apiUrl;
        this.container = document.getElementById(containerId);
    }

    async fetchData() {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            this.displayMovies(data.results);
        } catch (error) {
            console.error(error);
        }
    }

    displayMovies(movies) {
        movies.forEach(async (movie) => {
            const {
                overview: description,
                poster_path: image,
                original_title: title,
            } = movie;

            if (description !== "") {
                const movieContainer = document.createElement("div");
                movieContainer.classList.add("container");

                const imageElement = document.createElement("img");
                imageElement.crossOrigin = "anonymous";
                imageElement.src = `https://image.tmdb.org/t/p/w400${image}`;
                imageElement.alt = title;
                imageElement.classList.add("affiche");

                const color = new ColorThief();

                await new Promise((resolve) => {
                    imageElement.addEventListener("load", () => {
                        const dominant = color.getColor(imageElement);
                        movieContainer.style.backgroundColor = `rgb(${dominant[0]}, ${dominant[1]}, ${dominant[2]})`;

                        const descriptionDiv = document.createElement("div");
                        descriptionDiv.classList.add("description");

                        const titleElement = document.createElement("h1");
                        titleElement.classList.add("title");
                        titleElement.textContent = title;

                        const texteElement = document.createElement("p");
                        texteElement.classList.add("texte");
                        texteElement.textContent = description;

                        descriptionDiv.appendChild(titleElement);
                        descriptionDiv.appendChild(texteElement);

                        movieContainer.appendChild(imageElement);
                        movieContainer.appendChild(descriptionDiv);

                        this.container.appendChild(movieContainer);

                        resolve();
                    });
                });
            }
        });
    }
}

const apiUrl =
    "https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&api_key=b1637eebb893927b8e666df45bc939f1";
const containerId = "affichefilm";
const movieDisplay = new MovieDisplay(apiUrl, containerId);
movieDisplay.fetchData();
