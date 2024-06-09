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
import Movie from "../../models/Movie";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("/api/movie");
        if (response.ok) {
          const movies: Movie[] = await response.json();
          setMovies(movies);
        } else {
          console.error("Failed to fetch movies:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { toast } = useToast();

  const handleDeleteDialog = (movie: Movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedMovie) {
      throw new Error("No movie selected");
    }

    try {
      const response = await fetch("/api/movie", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedMovie),
      });

      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }

      const data = await response.json();
      const message = data.message;
      toast({
        title: "Résultats de la suppression :",
        description: message,
      });

      const updatedMovies = movies.filter(
        (item: Movie) => item.id !== selectedMovie.id
      );
      setMovies(updatedMovies);
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast({
        variant: "destructive",
        description: "Erreur lors de la suppression.",
      });
    }
  };

  return (
    <main>
      <div className="grid grid-cols-[repeat(auto-fit,170px)] md:grid-cols-[repeat(auto-fit,250px)] gap-5 justify-center my-8">
        {movies.length === 0 ? (
          <Loader2Icon className="animate-spin col-span-full mx-auto" />
        ) : (
          movies.map(
            (movie: Movie) =>
              movie.isAvailable && (
                <Card
                  key={movie.id}
                  className="w-[170px] md:w-[250px] relative overflow-hidden"
                >
                  <Image
                    src={movie.imageUrl}
                    alt={movie.title}
                    unoptimized
                    width={600}
                    height={400}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-0 right-0 m-2 z-10"
                    onClick={() => handleDeleteDialog(movie)}
                  >
                    <XIcon />
                  </Button>
                </Card>
              )
          )
        )}
      </div>
      <AlertDialog
        open={open}
        onOpenChange={(isOpen) => {
          if (isOpen === true) return;
          setSelectedMovie(null);
          setOpen(false);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedMovie?.title} ainsi que ses données dans Radarr et
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

export default Movies;
