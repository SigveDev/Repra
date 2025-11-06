import PlanPageComponent from "./planPageComponent";

export default async function PlanPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return <PlanPageComponent id={id} />;
}
