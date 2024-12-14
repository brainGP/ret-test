"use client"
import React from 'react'
import { Avatar, AvatarFallback, } from "@/components/ui/avatar"
import { LogOut, SettingsIcon } from "lucide-react"
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { isAdminC, logoutUser } from '@/lib/authHelper'


function UserAvatar({ name, picture }: { name: string, picture?: string }) {
    const router = useRouter();
    const isUserAdmin = isAdminC();

    console.log(isUserAdmin ? "user is admin" : "user is not admin");


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className='rounded-full p-0'>
                    <Avatar className='bg-slate-300 rounded-full'>
                        <AvatarFallback className='text-black/85 font-bold'>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Миний акаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isUserAdmin &&
                    <>
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => { router.push('/admin'); router.refresh() }}>
                                <SettingsIcon className="mr-2 h-4 w-4" />
                                <span>Admin</span>
                                <DropdownMenuShortcut>P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </>
                }
                <DropdownMenuItem onClick={() => { logoutUser(); router.refresh() }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Гарах</span>
                    <DropdownMenuShortcut>Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAvatar