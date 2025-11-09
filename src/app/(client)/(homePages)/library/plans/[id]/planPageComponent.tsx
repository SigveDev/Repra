"use client";

import { memberStatusColors } from "@/assets/memberStatusColors";
import { Alert, AlertDescription, AlertTitle } from "@/components/alert";
import BackMenu from "@/components/backMenu";
import ImageDropzone from "@/components/imageDropzone";
import MobileModal from "@/components/mobileModal";
import { useNotification } from "@/components/notifications";
import Repeat from "@/components/repeat";
import SearchExercises from "@/components/searchExercises";
import { Skeleton } from "@/components/skeleton";
import compareJsonObjects from "@/functions/compareJsonObjects";
import { GetExerciseFromId } from "@/services/client/exercises";
import {
  ChangePlanToPrivate,
  DeletePlan,
  GetPlanFromId,
  UpdateImageUrl,
  UpdatePlanDetails,
} from "@/services/client/plans";
import { DeleteImage, UploadNewImage } from "@/services/client/storage";
import { useAuthStore } from "@/store/Auth";
import { Exercise, Plan } from "@/types/plansType";
import {
  NoteSolidStandard,
  PlaySolidStandard,
} from "@hugeicons-pro/core-solid-standard";
import {
  AddCircleStrokeStandard,
  AlertCircleStrokeStandard,
  ArrowDown01StrokeStandard,
  ArrowUp01StrokeStandard,
  CheckmarkCircle02StrokeStandard,
  Delete02StrokeStandard,
  FloppyDiskStrokeStandard,
  Globe02StrokeStandard,
  MoreHorizontalStrokeStandard,
  ShareStrokeStandard,
  SquareLock01StrokeStandard,
} from "@hugeicons-pro/core-stroke-standard";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  useQuery,
  useQueries,
  type UseQueryResult,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlanPageComponent({ id }: { id: string }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const { showNotification } = useNotification();
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [addExercisesModalOpen, setAddExercisesModalOpen] = useState(false);
  const [openModalFromExerciseId, setOpenModalFromExerciseId] = useState<
    string | null
  >(null);
  const [editedPlan, setEditedPlan] = useState<Plan | undefined>();

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSaveMenu, setShowSaveMenu] = useState(false);

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const {
    data: plan,
    isLoading: isLoadingPlan,
    isError: isErrorPlan,
    refetch: refetchPlan,
  } = useQuery<Plan>({
    queryKey: ["plan", id],
    queryFn: async () => await GetPlanFromId(id),
  });

  useEffect(() => {
    if (plan) setEditedPlan(plan);
  }, [plan]);

  const exerciseQueries = useQueries({
    queries: (plan?.exerciseIds || []).map((exerciseId: string) => ({
      queryKey: ["exercise", exerciseId],
      queryFn: async () => {
        try {
          return await GetExerciseFromId(exerciseId);
        } catch {
          return null;
        }
      },
      enabled: !!plan,
      retry: false,
    })),
  }) as UseQueryResult<Exercise | null, unknown>[];

  const isLoadingExercises =
    exerciseQueries.length > 0 && exerciseQueries.some((q) => q.isLoading);

  const fetchedExercises = exerciseQueries
    .map((q) => q.data)
    .filter(Boolean) as Exercise[];

  useEffect(() => {
    if (!plan) {
      setSelectedExercises([]);
      return;
    }

    if (plan.exerciseIds.length === 0) {
      setSelectedExercises([]);
      return;
    }

    if (
      !isLoadingExercises &&
      fetchedExercises.length > 0 &&
      selectedExercises.length === 0
    ) {
      setSelectedExercises(fetchedExercises);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    plan?.exerciseIds?.join(","),
    isLoadingExercises,
    fetchedExercises.length,
  ]);

  const handleSavePlan = async () => {
    if (plan && editedPlan) {
      try {
        await UpdatePlanDetails(
          plan.$id,
          editedPlan.name,
          editedPlan.exerciseIds
        );

        refetchPlan();

        showNotification({
          header: "Plan updated",
          content: "Your changes have been saved.",
        });
      } catch (error) {
        console.error("Error updating plan:", error);
        showNotification({
          header: "Error updating plan",
          content: "There was an error saving your changes.",
        });
      }
    }
  };

  useEffect(() => {
    if (plan && editedPlan) {
      const hasChanged = compareJsonObjects(plan, editedPlan, [
        "imageUrl",
        "isPrivate",
      ]);
      setHasUnsavedChanges(hasChanged);
    }
  }, [plan, editedPlan]);

  useEffect(() => {
    if (!editedPlan) return;

    const newOrder = selectedExercises.map((e) => e.$id);
    const currentOrder = editedPlan.exerciseIds || [];

    const isSameOrder =
      currentOrder.length === newOrder.length &&
      currentOrder.every((id, idx) => id === newOrder[idx]);

    if (!isSameOrder) {
      setEditedPlan((prev) =>
        prev ? { ...prev, exerciseIds: newOrder } : prev
      );
    }
  }, [selectedExercises, editedPlan]);

  return (
    <div
      className="w-full h-fit min-h-screen flex flex-col items-center justify-start p-4 pb-[var(--total-mobile-bottom-height)] gap-2"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${
          memberStatusColors[user?.prefs?.repraTier || "rookie"]
        }66, var(--color-bg-primary) 80dvh)`,
      }}
    >
      <BackMenu
        onBack={() => {
          if (hasUnsavedChanges) {
            setShowSaveMenu(true);
          } else {
            router.back();
          }
        }}
      />
      <div className="w-full h-fit flex flex-col gap-5 justify-start items-center">
        <div className="w-full h-60 flex flex-row justify-center items-center">
          <div className="relative h-full aspect-square">
            {isLoadingPlan ? (
              <Skeleton className="w-full h-full" />
            ) : isErrorPlan ? (
              <Alert variant="destructive" className="w-full">
                <AlertTitle>There was an error loading this plan.</AlertTitle>
                <AlertDescription>Please try again later.</AlertDescription>
              </Alert>
            ) : (
              plan &&
              editedPlan && (
                <ImageDropzone
                  onChange={async (file) => {
                    if (file) {
                      if (editedPlan.imageUrl) {
                        const imageId = editedPlan.imageUrl
                          .split("/files/")[1]
                          .split("/preview")[0];
                        await DeleteImage(imageId);
                      }

                      const url = await UploadNewImage(file);
                      setEditedPlan({ ...editedPlan, imageUrl: url });

                      await UpdateImageUrl(editedPlan.$id, url);
                    }
                  }}
                  initialPreviewUrl={editedPlan.imageUrl}
                />
              )
            )}
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-5 justify-center items-start">
          <div className="w-full h-fit flex flex-row justify-start items-center">
            {isLoadingPlan ? (
              <Skeleton className="h-10 w-48" />
            ) : isErrorPlan ? (
              <Alert variant="destructive" className="w-full">
                <AlertTitle>There was an error loading this plan.</AlertTitle>
              </Alert>
            ) : (
              plan &&
              editedPlan && (
                <input
                  type="text"
                  value={editedPlan.name}
                  onChange={(e) =>
                    setEditedPlan({ ...editedPlan, name: e.target.value })
                  }
                  className="w-full font-bold text-2xl text-fg-primary focus:border-0 focus:ring-0 focus-visible:outline-0 bg-transparent"
                />
              )
            )}
          </div>
          <div className="w-full h-fit flex flex-row gap-2 justify-start items-center text-sm text-fg-secondary">
            {isLoadingPlan ? (
              <Skeleton className="h-6 w-32" />
            ) : isErrorPlan ? (
              <Alert variant="destructive" className="w-full">
                <AlertTitle>There was an error loading this plan.</AlertTitle>
              </Alert>
            ) : (
              plan &&
              editedPlan && (
                <>
                  <span className="text-fg-secondary font-semibold text-sm">
                    By{" "}
                    <span className="text-fg-primary">
                      {plan.authorId === user?.$id ? "You" : plan.authorId}
                    </span>
                  </span>
                  &bull;
                  <span className="text-fg-secondary font-semibold text-sm">
                    {editedPlan.exerciseIds.length} Exercises
                  </span>
                </>
              )
            )}
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
                variant="fixed"
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
                        setEditedPlan((prev) =>
                          prev
                            ? {
                                ...prev,
                                exerciseIds: [
                                  ...prev.exerciseIds,
                                  exercise.$id,
                                ],
                              }
                            : prev
                        );
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
                  icon={NoteSolidStandard}
                  className="w-8 h-8 inline"
                />
              </button>
              <MobileModal
                variant="floating"
                onCloseAction={() => setDeleteConfirmation(false)}
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
                      onClick={async () => {
                        if (!plan || !editedPlan) return;
                        const result = await ChangePlanToPrivate(
                          plan.$id,
                          !editedPlan.isPrivate
                        );

                        if (editedPlan) {
                          setEditedPlan({
                            ...editedPlan,
                            isPrivate: result.isPrivate,
                          });
                        }
                      }}
                      className="flex justify-start items-center text-fg-primary font-semibold text-lg h-10 w-full"
                    >
                      {editedPlan?.isPrivate ? (
                        <>
                          <HugeiconsIcon
                            icon={Globe02StrokeStandard}
                            className="w-6 h-6 inline mr-2"
                          />
                          Make Plan Public
                        </>
                      ) : (
                        <>
                          <HugeiconsIcon
                            icon={SquareLock01StrokeStandard}
                            className="w-6 h-6 inline mr-2"
                          />
                          Make Plan Private
                        </>
                      )}
                    </button>
                    <button
                      onClick={async () => {
                        if (!plan || !editedPlan) return;

                        try {
                          await navigator.share({
                            title: editedPlan.name,
                            text: `Check out this workout plan: ${editedPlan.name}`,
                            url: window.location.href,
                          });

                          showNotification({
                            icon: (
                              <HugeiconsIcon
                                icon={CheckmarkCircle02StrokeStandard}
                                className="w-7 h-7 text-fg-primary"
                              />
                            ),
                            header: "Plan Shared",
                            content: "Your plan has been successfully shared.",
                            duration: 4000,
                          });
                        } catch (error) {
                          console.error("Error sharing:", error);
                        }
                      }}
                      className="flex justify-start items-center text-fg-primary font-semibold text-lg h-10 w-full"
                    >
                      <HugeiconsIcon
                        icon={ShareStrokeStandard}
                        className="w-6 h-6 inline mr-2"
                      />
                      Share
                    </button>
                    <hr className="w-full border-t border-fg-tertiary" />
                    <button
                      onClick={async () => {
                        if (!plan) return;
                        setDeleteConfirmation(true);

                        if (deleteConfirmation) {
                          await DeletePlan(plan.$id);
                          showNotification({
                            icon: (
                              <HugeiconsIcon
                                icon={CheckmarkCircle02StrokeStandard}
                                className="w-7 h-7 text-fg-primary"
                              />
                            ),
                            header: "Plan Deleted",
                            content: "Your plan has been successfully deleted.",
                            duration: 4000,
                          });

                          router.push("/library");
                        }
                      }}
                      className={`${
                        deleteConfirmation
                          ? "text-red-700"
                          : "text-fg-secondary"
                      } font-semibold text-lg h-10 w-full flex justify-start items-center text-left`}
                    >
                      <HugeiconsIcon
                        icon={Delete02StrokeStandard}
                        className="w-6 h-6 inline mr-2.5"
                      />
                      {deleteConfirmation
                        ? "Are you sure? Tap again to confirm."
                        : "Delete Plan"}
                    </button>
                  </div>
                </MobileModal.Content>
              </MobileModal>
            </div>
            {hasUnsavedChanges ? (
              <button
                className="bg-primary flex justify-center items-center rounded-full h-12 w-12 text-bg-main"
                onClick={() => {
                  handleSavePlan();
                }}
              >
                <HugeiconsIcon
                  icon={FloppyDiskStrokeStandard}
                  className="w-7 h-7 inline"
                />
              </button>
            ) : (
              <button
                className="bg-primary flex justify-center items-center rounded-full h-12 w-12 text-bg-main"
                onClick={() => {
                  // handleStartWorkout();
                }}
              >
                <HugeiconsIcon
                  icon={PlaySolidStandard}
                  className="w-7 h-7 inline ml-1"
                />
              </button>
            )}
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-2 justify-start items-center">
          {selectedExercises.length > 0 ? (
            selectedExercises.map((exercise) => (
              <div
                className="w-full h-fit flex flex-row justify-between items-center bg-fg-secondary/10 px-2 py-1 rounded-lg"
                key={exercise.$id}
              >
                <div className="w-[calc(100%-2.5rem)] h-fit flex flex-col justify-center items-start">
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
                            setEditedPlan((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    exerciseIds: prev.exerciseIds.filter(
                                      (id) => id !== exercise.$id
                                    ),
                                  }
                                : prev
                            );
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
          ) : isLoadingExercises && plan && plan.exerciseIds.length > 0 ? (
            <Repeat count={3}>
              <Skeleton className="w-full h-14 rounded-lg" />
            </Repeat>
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
      <MobileModal
        open={showSaveMenu}
        onRequestClose={() => {
          setShowSaveMenu(false);
        }}
        variant="floating"
      >
        <MobileModal.Content>
          <div className="w-full h-fit flex flex-col gap-3 items-start text-start">
            <button
              onClick={() => {
                handleSavePlan();
                router.push("/library");
              }}
              className="text-fg-primary font-semibold text-lg h-10 w-full flex justify-start items-center text-left"
            >
              <HugeiconsIcon
                icon={FloppyDiskStrokeStandard}
                className="w-6 h-6 inline mr-2"
              />
              Save Changes
            </button>
            <button
              onClick={() => {
                router.push("/library");
              }}
              className="text-fg-secondary font-semibold text-lg h-10 w-full flex justify-start items-center text-left"
            >
              <HugeiconsIcon
                icon={Delete02StrokeStandard}
                className="w-6 h-6 inline mr-2"
              />
              Discard Changes
            </button>
          </div>
        </MobileModal.Content>
      </MobileModal>
    </div>
  );
}
