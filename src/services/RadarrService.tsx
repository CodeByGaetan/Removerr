import Movie from "../models/Movie";

const radarrApiUrl = process.env.RADARR_API_URL!;
const radarrApiKey = process.env.RADARR_API_KEY!;

class RadarrService {
  private static instance: RadarrService;
  private constructor() {}
  public static getInstance(): RadarrService {
    if (!RadarrService.instance) {
      RadarrService.instance = new RadarrService();
    }
    return RadarrService.instance;
  }

  public async getMovies(): Promise<Movie[]> {
    const path = `${radarrApiUrl}/movie`;
    const requestOptions = {
      method: "GET",
      headers: {
        "X-Api-Key": radarrApiKey,
      },
    };

    const response = await fetch(path, requestOptions);

    const data = await response.json();

    try {
      const filteredData: Movie[] = data.map((movie: any) => ({
        id: movie.id,
        tmdbId: movie.tmdbId,
        title: movie.title,
        imageUrl: movie.images[0].remoteUrl,
        isAvailable: movie.isAvailable,
      }));
      return filteredData;
    } catch (error) {
      throw new Error("Error filtering movies from Radarr API response");
    }
  }

  public async deleteMovieFromId(movieId: number): Promise<void> {
    const path = `${radarrApiUrl}/movie/${movieId}?deleteFiles=true`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "X-Api-Key": radarrApiKey,
      },
    };

    const response = await fetch(path, requestOptions);
    if (!response.ok) {
      throw new Error("Error deleting movie from Radarr API");
    }

    return;
  }
}

export const radarrService = RadarrService.getInstance();
