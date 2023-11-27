import getCurrentUser from "@/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

export default async function Sidebar({children}: {children: React.ReactNode}) {
    const currentUser = await getCurrentUser();

    return (
        <section className="h-full">
            <DesktopSidebar currentUser={currentUser!} />
            <MobileFooter />
            <main className="lg:pl-20 h-full">
               {children} 
            </main>
        </section>
    )
}