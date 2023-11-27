'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from 'axios';

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCallback, useEffect, useState } from "react"
import { Separator } from "../ui/separator"
import AuthSocialButton from "../ui/AuthSocialButton"

import {BsGithub, BsGoogle} from 'react-icons/bs';
import toast from "react-hot-toast";
import {signIn, useSession} from 'next-auth/react';
import { useRouter } from "next/navigation";

type Variant = 'LOGIN' | 'REGISTER'

export default function AuthForm() {
    const session = useSession();
    const router = useRouter();

    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState<boolean>(false); 

    useEffect(() => {
        if(session?.status === "authenticated") {
            router.push('/users')
        }
    }, [session?.status, router])

    const formSchema = z.object({
        name: variant === 'REGISTER' ? z.string().min(3, 'Name must be at least 3 characters').max(20) : z.string(),
        email: z.string().email(),
        password: z.string().min(8, 'Password must be at least 8 characters').max(20, 'Password must be at most 20 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter').regex(/[a-z]/, 'Password must container at least one lowecase letter')
        .regex(/[0-9]/, 'Password must contain at least one number').regex(/[@#¨$!%*?&]/, 'Password must contain at least one special character')
    })

    const toggleVariant = useCallback(() => {
        if(variant === 'LOGIN'){
            setVariant('REGISTER');
        } else{
            setVariant('LOGIN')
        }
    }, [variant])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>){
        console.log('onSubmit - isLoading:', isLoading);

        setIsLoading(true);

        if(variant === 'REGISTER'){
            axios.post('/api/register', values).then(() => signIn('credentials', values)).finally(() => setIsLoading(false))
            router.push('/users')
        }

        if(variant === 'LOGIN'){
            signIn('credentials', {
                ...values,
                redirect: false
            }).then((callback) => {
                if(callback?.error){
                    toast.error('Invalid Credentials')
                }
                if(callback?.ok && !callback?.error){
                    toast.success('Logged in!')
                    router.push('/users')
                }
            }).finally(() => setIsLoading(false))
        }
    }

    function socialAction(action: string){
        setIsLoading(true);

        signIn(action, {redirect: false}).then((callback) => {
            if(callback?.error){
                toast.error('Invalid Credentials')
            }
            if(callback?.ok && !callback?.error){
                toast.success('Logged in!')
            }
        }).finally(() => setIsLoading(false))
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {variant === 'REGISTER' && (
                        <FormField disabled={isLoading} control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Mark Cillessen" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    )}
                    <FormField disabled={isLoading} control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input placeholder="markcillessen@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField disabled={isLoading} control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <Button variant='outline' className="w-full" onClick={() => socialAction('github')}><BsGithub /></Button>
                        <Button variant='outline' className="w-full" onClick={() => socialAction('google')}><BsGoogle /></Button>
                    </div>

                    <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-muted-foreground">
                        <div>
                            {variant === 'LOGIN' ? 'New to MoonMate?' : 'Already have an account?'}
                        </div>
                        <div onClick={toggleVariant} className="underline cursor-pointer">
                            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                        </div>
                    </div>

                </form>
            </Form>
        </div>
    )
}