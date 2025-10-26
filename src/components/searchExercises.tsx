import { Exercise } from "@/types/plansType";
import Input from "./input";
import { useEffect, useState } from "react";
import axios from "axios";

const delay_ms = 500;

const SearchExercises = ({
  onSelect,
}: {
  onSelect: (exercise: Exercise) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const [results, setResults] = useState<Exercise[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay_ms);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (debouncedSearchTerm.trim() === "") {
          const response = await axios.get("/api/exercises/search");
          setResults(response.data);
        } else {
          const response = await axios.get(
            `/api/exercises/search?query=${encodeURIComponent(
              debouncedSearchTerm
            )}`
          );
          setResults(response.data);
        }
      } catch (err) {
        console.error(err);
        setResults([]);
      }
    };

    fetchResults();
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full h- flex flex-col items-center justify-center">
      <Input
        placeholder="Search Exercises..."
        className="w-full mb-4 border border-fg-tertiary text-fg-primary focus-visible:outline-0"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="w-full h-fit flex flex-col gap-2">
        <div className="w-full flex flex-col gap-2 overflow-y-auto h-96">
          {results.map((exercise) => (
            <button
              key={exercise.$id}
              className="w-full h-fit flex flex-col justify-center items-start text-start bg-fg-tertiary px-2 py-1 rounded-lg"
              onClick={() => {
                onSelect(exercise);
                setSearchTerm("");
              }}
            >
              <span className="text-lg font-bold">{exercise.name}</span>
              <span className="text-base text-fg-secondary">
                {exercise.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchExercises;
