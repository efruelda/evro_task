'use client'

import { JSX } from "react";
import { AppShell } from '@mantine/core';
import Menus from "../_components/Base/Menus";

const routeLayout = ({children }: {
        children: JSX.Element
    }) => {
      
        return (           
            <AppShell 
                header={{ height: 60 }}                  
                padding="md"
            >   
                <Menus />
                <AppShell.Main>
                    {children}
                </AppShell.Main>
            </AppShell>
        )
    };     

export default routeLayout;