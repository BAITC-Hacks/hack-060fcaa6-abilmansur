import InvestigatorApp from "@/components/InvestigatorApp";

/** Deep link to an investigation: the same app, opened on that thread. */
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <InvestigatorApp initialThreadId={id} />;
}
