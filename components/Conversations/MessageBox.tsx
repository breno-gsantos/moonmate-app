'use client'

import { cn } from "@/lib/utils";
import { FullMessageType } from "@/types/data"
import { useSession } from "next-auth/react";
import Avatar from "../Sidebar/Avatar";
import { format } from "date-fns";
import Image from "next/image";

interface MessageBoxProps{
    data: FullMessageType;
    isLast?: boolean;

}

export default function MessageBox({data, isLast}: MessageBoxProps) {
    const session = useSession();
    
    const isOwn = session?.data?.user?.email === data?.sender?.email;
    const seenList = (data.seen || []).filter((user) => user.email !== data?.sender?.email).map((user) => user.name).join(', ');

    const container = cn('flex gap-3 p-4', isOwn && 'justify-end');
    
    const avatar = cn(isOwn && 'order-2' );

    const body = cn('flex flex-col gap-2', isOwn && 'items-end');

    const message = cn('text-sm w-fit overflow-hidden', isOwn ? 'bg-primary text-secondary' : 'bg-gray-100', data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3')

    return (
        <section className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>

            <div className={body}>
                <div className="flex items-center gap-1">
                    <p className="text-sm text-gray-500">
                        {data.sender.name}
                    </p>
                    <p className="text-xs text-gray-400">
                        {format(new Date(data.createdAt), 'p')}
                    </p>
                </div>
                <div className={message}>
                    {data.image ? (
                        <Image src={data.image} alt="image" height={288} width={288} className="object-cover cursor-pointer hover:scale-110 transition translate" />
                    ) : (
                        <div>{data.body}</div>
                    )}
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className="text-xs font-light text-gray-500">
                        {`Seen by ${seenList}`}
                    </div>
                )}
            </div>

        </section>
    )
}