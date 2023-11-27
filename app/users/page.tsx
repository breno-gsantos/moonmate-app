import EmptyState from "@/components/Users/EmptyState";

export default function UsersPage(){
    return (
        <section className="hidden lg:block lg:pl-80 h-full">
            <EmptyState />
        </section>
    )
}