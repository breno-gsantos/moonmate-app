import AuthForm from "@/components/AuthForm/AuthForm";
import Image from "next/image";


export default function Home() {
  return (
    <main className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="container mx-auto sm:w-full sm:max-w-md">
        <Image src='/logo.svg' alt="Logo" width={48} height={48} className="mx-auto" />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <AuthForm />
    </main>
  )
}
