'use client'

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes"
import MobileItem from "./MobileItem";

export default function MobileFooter() {
    const routes = useRoutes();
    const {isOpen} = useConversation();

    if(isOpen){
        return null;
    }

    return (
        <section className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
            {routes.map(({href, icon, label, active, onClick}) => (
                <MobileItem key={href}  href={href} active={active} icon={icon} onClick={onClick} />
            ))}
        </section>
    )
}