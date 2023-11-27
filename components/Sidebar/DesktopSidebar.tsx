'use client'

import useRoutes from "@/hooks/useRoutes"
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "./Avatar";

interface DesktopSidebarProps{
    currentUser: User;
}

export default function DesktopSidebar({currentUser}: DesktopSidebarProps){
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <section className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
            <nav className="mt-4 flex flex-col justify-between">
                <ul role="list" className="flex flex-col items-center space-y-1">
                    {routes.map(({href, icon, label, active, onClick}) => (
                        <DesktopItem key={label} href={href} label={label} icon={icon} active={active} onClick={onClick} />
                    ))}
                </ul>
            </nav>

            <nav className="mt-4 flex flex-col justify-between items-center">
                <div onClick={() => setIsOpen(true)} className="cursor-pointer hover:opacity-75 transition">
                    <Avatar user={currentUser} />
                </div>
            </nav>
        </section>
    )
}