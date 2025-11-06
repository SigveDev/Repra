import PlanPageComponent from "./planPageComponent";

export default async function NewWorkoutPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PlanPageComponent id={id} />;
}
