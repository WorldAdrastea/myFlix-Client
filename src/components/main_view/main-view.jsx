import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Bee Movie",
      description: "Barry B Benson, a bee who has just completed his graduation, decides to sue humans after he learns about the exploitation of bees at the hands of mankind.",
      image: "https://upload.wikimedia.org/wikipedia/en/5/5f/Bee_Movie_%282007_animated_feature_film%29.jpg",
      genre: "Animation",
      director: "Simon J. Smith"
    },
    {
      id: 2,
      title: "Morbius",
      description: "Determined to cure the disease that has plagued him his entire life, Morbius conducts a drastic experiment, which bears unforeseen consequences.",
      image: "https://upload.wikimedia.org/wikipedia/en/2/2f/Morbius_%28film%29_poster.jpg",
      genre: "Horror",
      director: "Daniel Espinosa"
    },
    {
      id: 3,
      title: "Barbie",
      description: "After being expelled from Barbieland for being a less than perfect-looking doll, Barbie sets off for the human world to find true happiness.",
      image: "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg",
      genre: "Comedy",
      director: "Greta Gerwig"
    },
    {
      id: 4,
      title: "Finding Nemo",
      description: "After his son gets abducted from the Great Barrier Reef and is dispatched to Sydney, Marlin, a meek clownfish, enlists the help of a forgetful fish and embarks on a journey to bring him home.",
      image: "https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg",
      genre: "Animation",
      director: "Andrew Stanton"
    },
    {
      id: 5,
      title: "Blade",
      description: "Blade, who is part-vampire and part-mortal, becomes a vampire hunter to protect human beings. He prevents vampires from taking control over the human race.",
      image: "https://upload.wikimedia.org/wikipedia/en/1/19/Blade_movie.jpg",
      genre: "Horror",
      director: "Stephen Norrington"
    }
  ]);



  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

export default MainView;