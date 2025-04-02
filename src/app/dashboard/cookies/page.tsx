import { TabBar } from "@/components";
import { cookies } from "next/headers";

export const metadata = {
  title: "Ćookies Page",
  description: "Ćookies Page",
};
export default async function CookiePage() {
  const cookieStore = await cookies();
  const cookieTab = cookieStore.get("currentTab")?.value ?? "1";
  const allCookies = cookieStore.getAll();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex-flex-col">
        <h2 className="text-5xl">Tabs</h2>
        <TabBar currentTab={+cookieTab} />
      </div>
      <div className="flex flex-col text-center">
      Cookies:
      {
        allCookies.map((cookie, index) => {
          return (
            <div key={index}>
              <span className="text-2xl">Name: {cookie.name} -  Value: {cookie.value}</span>
            </div>
          );
        })
      }
      </div>
    </div>
  );
}
