import { SignedIn, UserButton } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          🐑 Farm Manager
        </h1>
        <nav className="flex items-center gap-4">
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto py-6">{children}</main>
    </div>
  );
}
