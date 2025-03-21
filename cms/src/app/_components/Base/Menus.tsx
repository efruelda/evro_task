"use client"

import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from "./Header";
import SideBar from "./Sidebar";

export default function Menus(){
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        >
            <Header opened={opened} toggle={toggle} />
            <SideBar/>
        </AppShell>
    )
}