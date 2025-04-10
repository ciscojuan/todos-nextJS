import { WidgetItem } from "@/components/WidgetItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin");

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <WidgetItem title="Usuario conectado">
          <div className="flex flex-col">
            <span>{session.user?.name}</span>
            <span>{session.user?.email}</span>
           
           <div className="flex flex-col">
            {JSON.stringify(session)}
            </div> 
          </div>
        </WidgetItem>
      </div>
    </div>
  );
}
