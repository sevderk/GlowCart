export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
