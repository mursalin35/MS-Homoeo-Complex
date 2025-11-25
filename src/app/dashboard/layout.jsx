export default function DashboardLayout({ children }) {
  return (
    <div className="flex gap-8 w-full h-screen">
      <div className="bg-red-500">Sidebar</div>
      <div>{children}</div>
    </div>
  );
}
