const express = require("express");

const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "moviesData.db");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DBError:${e.message}`);
    process.exit(1);
  }
};

module.exports = app;
initializeDBAndServer();

const convertMovieNameToPascalCase = (dbObject) => {
  return {
    movieName: dbObject.movie_name,
  };
};

//get movies
app.get("/movies/", async (request, response) => {
  const getMovieQuery = `
    SELECT
      *
    FROM
      movie
   ;`;
  const movieArray = await db.all(getMovieQuery);
  response.send(
    movieArray.map((movieName) => convertMovieNameToPascalCase(movieName))
  );
});

//Creates a new movie in the movie table. movie_id is auto-incremented

app.post("/movies/", async (request, response) => {
  const movieDetails = request.body;
  const { directorId, movieName, leadActor } = movieDetails;
  const addMovieQuery = `
    INSERT INTO 
    movie(director_id, movie_name, lead_actor)
    VALUES(
        ${director_id},
        '${movie_name}',
        '${lead_actor}');`;
  const dbResponse = await db.run(addMovieQuery);
  console.log(dbResponse);
});
