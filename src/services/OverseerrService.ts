const overseerrApiUrl = process.env.OVERSEERR_API_URL!;
const overseerrApiKey = process.env.OVERSEERR_API_KEY!;

class OverseerService {
  private static instance: OverseerService;
  private constructor() {}
  public static getInstance(): OverseerService {
    if (!OverseerService.instance) {
      OverseerService.instance = new OverseerService();
    }
    return OverseerService.instance;
  }

  public async getMediaIdFromTmdbId(tmdbId: number): Promise<number> {
    const path = `${overseerrApiUrl}/movie/${tmdbId}`;
    const requestOptions = {
      method: "GET",
      headers: {
        "X-Api-Key": overseerrApiKey,
      },
    };

    const response = await fetch(path, requestOptions);
    const data = await response.json();

    try {
      const mediaId = data.mediaInfo.id;
      return mediaId;
    } catch (error) {
      throw new Error("No mediaId returned from Overseerr API");
    }
  }

  public async getMediaIdFromTvdbId(tvdbId: number): Promise<number> {
    const query = encodeURIComponent(`tvdb:${tvdbId}`);
    const path = `${overseerrApiUrl}/search?page=1&query=${query}`;

    const requestOptions = {
      method: "GET",
      headers: {
        "X-Api-Key": overseerrApiKey,
      },
    };

    const response = await fetch(path, requestOptions);
    const data = await response.json();

    try {
      const mediaId = data.results[0].mediaInfo.id;
      return mediaId;
    } catch (error) {
      throw new Error("No mediaId returned from Overseerr API");
    }
  }

  public async deleteMediaFromId(mediaId: number): Promise<void> {
    const path = `${overseerrApiUrl}/media/${mediaId}`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "X-Api-Key": overseerrApiKey,
      },
    };

    const response = await fetch(path, requestOptions);
    if (!response.ok) {
      throw new Error("Error deleting media from Overseerr API");
    }

    return;
  }
}

export const overseerService = OverseerService.getInstance();
