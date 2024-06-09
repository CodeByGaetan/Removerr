import Serie from "../models/Serie";

const sonarrApiUrl = process.env.SONARR_API_URL!;
const sonarrApiKey = process.env.SONARR_API_KEY!;

class SonarrService {
  private static instance: SonarrService;

  private constructor() {}

  public static getInstance(): SonarrService {
    if (!SonarrService.instance) {
      SonarrService.instance = new SonarrService();
    }
    return SonarrService.instance;
  }

  public async getSeries(): Promise<Serie[]> {
    const path = `${sonarrApiUrl}/series`;
    const requestOptions = {
      method: "GET",
      headers: {
        "X-Api-Key": sonarrApiKey,
      },
    };

    const response = await fetch(path, requestOptions);
    const data = await response.json();

    try {
      const filteredData: Serie[] = data.map((serie: any) => ({
        id: serie.id,
        tvdbId: serie.tvdbId,
        title: serie.title,
        imageUrl: serie.images[1]?.remoteUrl,
      }));
      return filteredData;
    } catch (error) {
      throw new Error(
        `Error filtering series from Sonarr API response : ${error}`
      );
    }
  }

  public async deleteSerieFromId(serieId: number): Promise<void> {
    const path = `${sonarrApiUrl}/series/${serieId}?deleteFiles=true`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "X-Api-Key": sonarrApiKey,
      },
    };

    const response = await fetch(path, requestOptions);
    if (!response.ok) {
      throw new Error("Error deleting serie from Sonarr API");
    }

    return;
  }
}

export const sonarrService = SonarrService.getInstance();
