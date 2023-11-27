'use client'

import { cn } from "@/lib/utils";

import useConversation from "@/hooks/useConversation";
import EmptyState from "@/components/Users/EmptyState";

export default function Home(){
    const {isOpen} = useConversation();

    return (
        <section className={cn('lg:pl-80 h-full lg:block', isOpen ? 'block' : 'hidden')}>
            <EmptyState />
        </section>
    )
}