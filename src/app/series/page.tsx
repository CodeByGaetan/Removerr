"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2Icon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Serie from "../../models/Serie";

const Series = () => {
  const [series, setSeries] = useState<Serie[]>([]);

  useEffect(() => {
    async function fetchSeries() {
      try {
        const response = await fetch("/api/serie");
        if (response.ok) {
          const series: Serie[] = await response.json();
          setSeries(series);
        } else {
          console.error("Failed to fetch series:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    }

    fetchSeries();
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedSerie, setSelectedSerie] = useState<Serie | null>(null);
  const { toast } = useToast();

  const handleDeleteDialog = (serie: Serie) => {
    setSelectedSerie(serie);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedSerie) {
      throw new Error("No serie selected");
    }

    toast({
      title: "Suppression en cours ...",
      description: selectedSerie.title,
    });

    try {
      const response = await fetch("/api/serie", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedSerie),
      });

      if (!response.ok) {
        throw new Error("Failed to delete serie");
      }

      const data = await response.json();
      const message = data.message;
      toast({
        title: "Résultats de la suppression :",
        description: message,
      });

      const updatedSeries = series.filter(
        (item: Serie) => item.id !== selectedSerie.id
      );
      setSeries(updatedSeries);
    } catch (error) {
      console.error("Error deleting serie:", error);
      toast({
        variant: "destructive",
        description: "Erreur lors de la suppression.",
      });
    }
  };

  return (
    <main>
      <div className="grid grid-cols-[repeat(auto-fit,170px)] md:grid-cols-[repeat(auto-fit,250px)] gap-5 justify-center my-8">
        {series.length === 0 ? (
          <Loader2Icon className="animate-spin col-span-full mx-auto" />
        ) : (
          series.map((serie: Serie) => (
            <Card
              key={serie.id}
              className="w-[170px] md:w-[250px] relative overflow-hidden"
            >
              {serie.imageUrl ? (
                <Image
                  src={serie.imageUrl}
                  alt={serie.title}
                  unoptimized
                  width={600}
                  height={400}
                />
              ) : (
                <div className="h-[400px] w-[600px]" />
              )}
              <Button
                variant="outline"
                size="icon"
                className="absolute top-0 right-0 m-2 z-10"
                onClick={() => handleDeleteDialog(serie)}
              >
                <XIcon />
              </Button>
              <p className="w-full text-xs absolute bottom-0 text-center text-white bg-black">
                {serie.title}
              </p>
            </Card>
          ))
        )}
      </div>
      <AlertDialog
        open={open}
        onOpenChange={(isOpen) => {
          if (isOpen === true) return;
          setSelectedSerie(null);
          setOpen(false);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedSerie?.title} ainsi que ses données dans Sonarr et
              Overseerr seront complètement supprimés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Series;
