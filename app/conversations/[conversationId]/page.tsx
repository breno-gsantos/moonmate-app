import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import Body from "@/components/Conversations/Body";
import Header from "@/components/Conversations/Header";
import MessageForm from "@/components/Conversations/MessageForm";
import EmptyState from "@/components/Users/EmptyState";

interface IParams{
    conversationId: string;
};

export default async function ConversationId({params}: {params:IParams}){
    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);

    if(!conversation){
        return (
            <div className="lg:pl-80 w-full">
                <div className="w-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        );
    }

    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header conversation={conversation} />
                <Body initialMessages={messages} />
                <MessageForm />
            </div>
        </div>
    )
}