
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Sidebar } from "@/components/admin/sidebar";
import Providers from "@/providers/providers";

// export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(session, 'session')
  // if (!session || session.user.role !== "ADMIN") {
  //   redirect('/api/auth/signin');
  // }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
       <Providers session={session}>
          {children}
        </Providers>
      </main>
    </div>
  );
}
