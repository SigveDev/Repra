/* eslint-disable @typescript-eslint/no-explicit-any */
import PlanPageComponent from "./planPageComponent";

export default async function PlanPage({ params }: { params: any }) {
  const { id } = await params;

  return <PlanPageComponent id={id} />;
}
