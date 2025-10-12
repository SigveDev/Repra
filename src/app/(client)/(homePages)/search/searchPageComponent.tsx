"use client";

import Input from "@/components/input";
import { Search01SolidRounded } from "@hugeicons-pro/core-solid-rounded";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

function SearchPageComponent() {
  const [tempQuery, setTempQuery] = useState("");
  const [query, setQuery] = useState("");
  const [queryType, setQueryType] = useState<"workouts" | "rutines" | "users">(
    "workouts"
  );
  return (
    <div className="p-4 min-h-screen h-fit w-full flex flex-col gap-5">
      <div className="w-full h-fit flex flex-col gap-3">
        <form className="w-full h-10 flex flex-col gap-3 relative">
          <Input
            type="text"
            id="searchQuery"
            name="searchQuery"
            placeholder="What are you looking for?"
            value={tempQuery}
            onChange={(e) => setTempQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setQuery(tempQuery);
              }
            }}
          />
          <button
            type="submit"
            className="w-fit h-full flex justify-center items-center absolute top-0 right-3 text-fg-secondary/70"
            onClick={(e) => {
              e.preventDefault();
              setQuery(tempQuery);
            }}
          >
            <HugeiconsIcon icon={Search01SolidRounded} className="w-6 h-6" />
          </button>
        </form>
        <div className="w-fit h-7 flex flex-row gap-3 justify-center items-center">
          <button
            className={`w-fit h-full flex justify-center items-center text-sm text-fg-primary ${
              queryType === "workouts" ? "bg-primary" : "bg-bg-secondary"
            } rounded-full px-4 py-2`}
            onClick={() => setQueryType("workouts")}
          >
            Workouts
          </button>
          <button
            className={`w-fit h-full flex justify-center items-center text-sm text-fg-primary ${
              queryType === "rutines" ? "bg-primary" : "bg-bg-secondary"
            } rounded-full px-4 py-2`}
            onClick={() => setQueryType("rutines")}
          >
            Rutines
          </button>
          <button
            className={`w-fit h-full flex justify-center items-center text-sm text-fg-primary ${
              queryType === "users" ? "bg-primary" : "bg-bg-secondary"
            } rounded-full px-4 py-2`}
            onClick={() => setQueryType("users")}
          >
            Users
          </button>
        </div>
      </div>
      {query === "" && (
        <section className="w-full h-fit flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-fg-primary">Browse all</h2>
          <div className="w-full h-fit flex flex-col gap-7">
            <div className="w-full h-fit flex flex-col gap-3">
              <p className="text-base text-fg-primary/90">Discover</p>
              <div className="w-full h-fit grid grid-cols-2 grid-rows-4 gap-x-5 gap-y-3 mt-1.5">
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-purple-500 to-pink-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Chest</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-blue-500 to-green-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Back</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-yellow-500 to-orange-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Biceps</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-teal-500 to-blue-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Triceps</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-red-500 to-purple-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Forearms</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-purple-500 to-pink-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Core</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-yellow-500 to-red-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Legs</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-blue-500 to-green-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Glutes</h3>
                </button>
              </div>
            </div>
            <div className="w-full h-fit flex flex-col gap-3">
              <p className="text-base text-fg-primary/90">Popular</p>
              <div className="w-full h-fit grid grid-cols-2 grid-rows-4 gap-x-5 gap-y-3 mt-1.5">
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-yellow-500 to-orange-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Push</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-blue-500 to-green-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Pull</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-purple-500 to-pink-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Leggs</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-teal-500 to-blue-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Upper</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-blue-500 to-green-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Lower</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-purple-500 to-pink-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Shoulders</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-yellow-500 to-red-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Arms</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-blue-500 to-green-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Core</h3>
                </button>
              </div>
            </div>
            <div className="w-full h-fit flex flex-col gap-3">
              <p className="text-base text-fg-primary/90">Programs</p>
              <div className="w-full h-fit grid grid-cols-2 grid-rows-3 gap-x-5 gap-y-3 mt-1.5">
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-blue-500 to-green-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Weightloss</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-gray-700 to-black text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Compound</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-purple-500 to-pink-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Bodybuilding</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-red-800 to-black text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Strongman</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-blue-500 to-green-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Calisthenics</h3>
                </button>
                <button className="w-full h-24 rounded-xl relative flex justify-center items-center text-left flex-wrap p-6 bg-gradient-to-tr from-yellow-500 to-orange-500 text-fg-primary">
                  <h3 className="text-2xl font-bold w-full">Bulking</h3>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default SearchPageComponent;
