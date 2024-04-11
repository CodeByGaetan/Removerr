import Serie from "@/models/Serie";
import { overseerService } from "@/services/OverseerrService";
import { sonarrService } from "@/services/SonarrService";

export async function GET() {
  try {
    const series = await sonarrService.getSeries();
    return Response.json(series);
  } catch (error) {
    console.log((error as Error).message);
    return Response.json({ error: "Internal Server Error" });
  }
}

export async function DELETE(request: Request) {
  const serie: Serie = await request.json();

  let message = "";

  try {
    const mediaId = await overseerService.getMediaIdFromTvdbId(serie.tvdbId);

    await overseerService.deleteMediaFromId(mediaId);

    message += "Overserr: 🟩 | ";
  } catch (error) {
    console.log((error as Error).message);

    message += "Overserr: 🟥 | ";
  }

  try {
    await sonarrService.deleteSerieFromId(serie.id);

    message += "Sonarr: 🟩";
  } catch (error) {
    console.log((error as Error).message);

    message += "Sonarr: 🟥";
  }

  return Response.json({ message: message });
}
