import AdminNav from "./_components/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminNav>{children}</AdminNav>
    </div>
  );
}