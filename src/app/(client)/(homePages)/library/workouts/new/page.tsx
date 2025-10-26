"use client";

import { memberStatusColors } from "@/assets/memberStatusColors";
import BackMenu from "@/components/backMenu";
import { useAuthStore } from "@/store/Auth";
import { useEffect, useState } from "react";
import getBlendedColor from "@/functions/getBlendedColor";
import { useRouter } from "next/navigation";
import ImageDropzone from "@/components/imageDropzone";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AddCircleStrokeStandard,
  AlertCircleStrokeStandard,
  ArrowDown01StrokeStandard,
  ArrowUp01StrokeStandard,
  Delete02StrokeStandard,
  MoreHorizontalStrokeStandard,
  NoteStrokeStandard,
  Upload01StrokeStandard,
} from "@hugeicons-pro/core-stroke-standard";
import { Exercise } from "@/types/plansType";
import MobileModal from "@/components/mobileModal";
import SearchExercises from "@/components/searchExercises";
import { useNotification } from "@/components/notifications";

export default function NewWorkoutPage() {
  const { showNotification } = useNotification();
  const { user } = useAuthStore();
  const router = useRouter();
  const [newWorkout, setNewWorkout] = useState<{
    title: string;
    imageUrl: string | null;
    exerciseIds: string[];
  }>(() => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 5; i++)
      id += chars[Math.floor(Math.random() * chars.length)];
    return {
      title: `New Workout #${id}`,
      imageUrl: null,
      exerciseIds: [],
    };
  });
  // don't keep the file object around unless needed; we only store a preview URL
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const [addExercisesModalOpen, setAddExercisesModalOpen] = useState(false);

  const [openModalFromExerciseId, setOpenModalFromExerciseId] = useState<
    string | null
  >(null);

  useEffect(() => {
    let metaThemeColor = document.querySelector(
      "meta[name='theme-color']"
    ) as HTMLMetaElement | null;
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }

    const previousContent = metaThemeColor.getAttribute("content");
    let bgHexForRestore: string | null = null;
    let canceled = false;

    const baseHex = memberStatusColors[user?.prefs?.repraTier || "rookie"];
    getBlendedColor(baseHex, "66").then(
      ({ blendedHex, bgHexForRestore: bgRestore }) => {
        if (canceled) return;
        bgHexForRestore = bgRestore;
        if (metaThemeColor) metaThemeColor.setAttribute("content", blendedHex);
      }
    );

    return () => {
      canceled = true;
      if (metaThemeColor) {
        if (bgHexForRestore) {
          metaThemeColor.setAttribute("content", bgHexForRestore);
        } else if (previousContent) {
          metaThemeColor.setAttribute("content", previousContent);
        } else {
          try {
            if (metaThemeColor.parentNode)
              metaThemeColor.parentNode.removeChild(metaThemeColor);
          } catch (e) {
            void e;
          }
        }
      }
    };
  }, [user]);

  return (
    <div
      className="w-full h-fit min-h-screen flex flex-col items-center justify-start p-4 pb-[var(--total-mobile-bottom-height)] gap-2"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${
          memberStatusColors[user?.prefs?.repraTier || "rookie"]
        }66, transparent 90%)`,
      }}
    >
      <BackMenu
        onBack={() => {
          router.push("/library");
        }}
      />
      <div className="w-full h-fit flex flex-col gap-5 justify-start items-center">
        <div className="w-full h-60 flex flex-row justify-center items-center">
          <div className="relative h-full aspect-square">
            <ImageDropzone
              onChange={(file) => {
                const url = file ? URL.createObjectURL(file) : null;
                setNewWorkout({ ...newWorkout, imageUrl: url });
              }}
            />
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-5 justify-center items-start">
          <div className="w-full h-fit flex flex-row justify-start items-center">
            <input
              type="text"
              value={newWorkout.title}
              onChange={(e) =>
                setNewWorkout({ ...newWorkout, title: e.target.value })
              }
              className="w-full font-bold text-2xl text-fg-primary focus:border-0 focus:ring-0 focus-visible:outline-0 bg-transparent"
            />
          </div>
          <div className="w-full h-fit flex flex-row gap-2 justify-start items-center text-sm text-fg-secondary">
            <span className="text-fg-secondary font-semibold text-sm">
              By <span className="text-fg-primary">{user?.name}</span>
            </span>
            &bull;
            <span className="text-fg-secondary font-semibold text-sm">
              {newWorkout.exerciseIds.length} Exercises
            </span>
          </div>
          <div className="w-full h-fit flex flex-row gap-3 justify-between items-center text-sm text-fg-secondary">
            <div className="w-fit h-fit flex flex-row gap-5">
              <MobileModal
                open={addExercisesModalOpen}
                onRequestOpen={() => {
                  setAddExercisesModalOpen(true);
                }}
                onRequestClose={() => {
                  setAddExercisesModalOpen(false);
                }}
              >
                <MobileModal.Trigger>
                  <button className="text-fg-secondary font-semibold text-sm">
                    <HugeiconsIcon
                      icon={AddCircleStrokeStandard}
                      className="w-9 h-9 inline"
                    />
                  </button>
                </MobileModal.Trigger>
                <MobileModal.Content>
                  <SearchExercises
                    onSelect={(exercise) => {
                      if (
                        selectedExercises.findIndex(
                          (e) => e.$id === exercise.$id
                        ) === -1
                      ) {
                        setNewWorkout((prev) => ({
                          ...prev,
                          exerciseIds: [...prev.exerciseIds, exercise.$id],
                        }));
                        setSelectedExercises((prev) => [...prev, exercise]);
                      } else {
                        showNotification({
                          icon: (
                            <HugeiconsIcon
                              icon={AlertCircleStrokeStandard}
                              className="w-7 h-7 text-fg-primary"
                            />
                          ),
                          header: "There was a problem",
                          content: "This exercise is already in your workout.",
                          duration: 4000,
                        });
                      }
                      setAddExercisesModalOpen(false);
                    }}
                  />
                </MobileModal.Content>
              </MobileModal>
              <button className="text-fg-secondary font-semibold text-sm">
                <HugeiconsIcon
                  icon={NoteStrokeStandard}
                  className="w-8 h-8 inline"
                />
              </button>
              <button className="text-fg-secondary font-semibold text-sm">
                <HugeiconsIcon
                  icon={MoreHorizontalStrokeStandard}
                  className="w-8 h-8 inline"
                />
              </button>
            </div>
            <button className="bg-primary flex justify-center items-center rounded-full h-12 w-12 text-fg-primary">
              <HugeiconsIcon
                icon={Upload01StrokeStandard}
                className="w-7 h-7 inline"
              />
            </button>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-2 justify-start items-center">
          {selectedExercises.length > 0 ? (
            selectedExercises.map((exercise) => (
              <div
                className="w-full h-fit flex flex-row justify-between items-center bg-fg-secondary/10 px-2 py-1 rounded-lg"
                key={exercise.$id}
              >
                <div className="w-[calc(100%-2.5rem)] h-fit flex flex-col justify-center items-start gap-2">
                  <span className="text-lg font-bold">{exercise.name}</span>
                  <span className="w-full text-base text-fg-secondary text-ellipsis overflow-hidden whitespace-nowrap">
                    {exercise.description}
                  </span>
                </div>
                <div className="flex flex-row h-full w-8 justify-center items-center">
                  <MobileModal
                    open={openModalFromExerciseId === exercise.$id}
                    onRequestOpen={() => {
                      setOpenModalFromExerciseId(exercise.$id);
                    }}
                    onRequestClose={() => {
                      setOpenModalFromExerciseId(null);
                    }}
                  >
                    <MobileModal.Trigger>
                      <button className="text-fg-secondary font-semibold text-sm">
                        <HugeiconsIcon
                          icon={MoreHorizontalStrokeStandard}
                          className="w-8 h-8 inline"
                        />
                      </button>
                    </MobileModal.Trigger>
                    <MobileModal.Content>
                      <div className="w-full h-fit flex flex-col gap-3 items-start text-start">
                        <button
                          onClick={() => {
                            setSelectedExercises((prev) => {
                              const index = prev.findIndex(
                                (e) => e.$id === exercise.$id
                              );
                              if (index > 0) {
                                const newExercises = [...prev];
                                const [movedExercise] = newExercises.splice(
                                  index,
                                  1
                                );
                                newExercises.splice(
                                  index - 1,
                                  0,
                                  movedExercise
                                );
                                return newExercises;
                              }
                              return prev;
                            });
                            setOpenModalFromExerciseId(null);
                          }}
                          className="text-fg-secondary font-semibold text-lg h-10 w-full flex justify-start items-center text-left"
                        >
                          <HugeiconsIcon
                            icon={ArrowUp01StrokeStandard}
                            className="w-7 h-7 inline mr-2"
                          />
                          Move Up
                        </button>
                        <button
                          onClick={() => {
                            setSelectedExercises((prev) => {
                              const index = prev.findIndex(
                                (e) => e.$id === exercise.$id
                              );
                              if (index < prev.length - 1) {
                                const newExercises = [...prev];
                                const [movedExercise] = newExercises.splice(
                                  index,
                                  1
                                );
                                newExercises.splice(
                                  index + 1,
                                  0,
                                  movedExercise
                                );
                                return newExercises;
                              }
                              return prev;
                            });
                            setOpenModalFromExerciseId(null);
                          }}
                          className="text-fg-secondary font-semibold text-lg h-10 w-full flex justify-start items-center text-left"
                        >
                          <HugeiconsIcon
                            icon={ArrowDown01StrokeStandard}
                            className="w-7 h-7 inline mr-2"
                          />
                          Move Down
                        </button>
                        <hr className="w-full border-t border-fg-tertiary" />
                        <button
                          onClick={() => {
                            setSelectedExercises((prev) =>
                              prev.filter((e) => e.$id !== exercise.$id)
                            );
                            setNewWorkout((prev) => ({
                              ...prev,
                              exerciseIds: prev.exerciseIds.filter(
                                (id) => id !== exercise.$id
                              ),
                            }));
                            setOpenModalFromExerciseId(null);
                          }}
                          className="text-fg-secondary font-semibold text-lg h-10 w-full flex justify-start items-center text-left"
                        >
                          <HugeiconsIcon
                            icon={Delete02StrokeStandard}
                            className="w-6 h-6 inline mr-2.5"
                          />
                          Remove from workout
                        </button>
                      </div>
                    </MobileModal.Content>
                  </MobileModal>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-fit flex flex-col justify-center items-center text-center text-fg-secondary">
              <span className="text-sm">No exercises added yet.</span>
              <span className="text-xs">
                Tap the + icon above to add exercises to your workout.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
