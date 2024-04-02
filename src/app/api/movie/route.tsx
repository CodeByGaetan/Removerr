import Movie from "@/app/models/Movie";
import { overseerService } from "@/app/services/OverseerrService";
import { radarrService } from "@/app/services/RadarrService";

export async function GET() {
  try {
    const movies = await radarrService.getMovies();
    return Response.json(movies);
  } catch (error) {
    console.log((error as Error).message);
    return Response.json({ error: "Internal Server Error" });
  }
}

export async function DELETE(request: Request) {
  const movie: Movie = await request.json();

  let message = "";

  try {
    const mediaId = await overseerService.getMediaIdFromTmdbId(movie.tmdbId);

    await overseerService.deleteMediaFromId(mediaId);

    message += "Overserr: 🟩 | ";
  } catch (error) {
    console.log((error as Error).message);

    message += "Overserr: 🟥 | ";
  }

  try {
    await radarrService.deleteMovieFromId(movie.id);

    message += "Radarr: 🟩";
  } catch (error) {
    console.log((error as Error).message);

    message += "Radarr: 🟥";
  }

  return Response.json({ message: message });
}
