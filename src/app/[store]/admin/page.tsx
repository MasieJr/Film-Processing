import AdminDashboard from "@/components/AdminDashboard";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ store: string }>;
}) {
  const { store } = await params;

  return <AdminDashboard slug={store} />;
}
