'use client'

import ConversationId from "@/app/conversations/[conversationId]/page"
import useConversation from "@/hooks/useConversation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {CldUploadButton} from 'next-cloudinary';

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2"

const formSchema = z.object({
    message: z.string().min(2),
  })

export default function MessageForm(){
    const {conversationId} = useConversation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          message: "",
        },
      })

    function onSubmit(data: z.infer<typeof formSchema>){
        axios.post('/api/messages', {
            ...data,
            conversationId: conversationId
        })
    }

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }

    return (
        <div className="flex items-center py-4 px-4 border-t gap-2 lg:gap-4 w-full">
            <CldUploadButton options={{maxFiles: 1}} onUpload={handleUpload} uploadPreset="ulto9xjf">
                <HiPhoto size={30} className='text-primary' />
            </CldUploadButton>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
                    <FormField control={form.control} name="message" render={({ field }) => (
                        <Input placeholder="Write a message" {...field} className="text-black font-normal py-2 px-4 bg-neutral-100 rounded-full" required />
                     )}/>
                    <Button size='icon' type="submit" className="rounded-full"><HiPaperAirplane size={18} /></Button>
                </form>
            </Form>
        </div>
    )
}