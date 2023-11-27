import getConversations from "@/actions/getConversations";
import ConversationList from "@/components/Conversations/ConversationList";
import Sidebar from "@/components/Sidebar/Sidebar";

export default async function ConversationsLayout({children} : {children: React.ReactNode}) {
    const conversations = await getConversations();

    return (
        <Sidebar>
            <main className="h-full">
                <ConversationList initialItems={conversations} />
                {children}
            </main>
        </Sidebar>
    )
}