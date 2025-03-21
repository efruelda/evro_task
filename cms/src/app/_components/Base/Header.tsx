"use client"

import useAuthStore from '@/app/_stores/authStore';
import { AppShell, Burger, Group } from '@mantine/core';

type Props = {
    opened: boolean;
    toggle: () => void;
};
  
export default function Header({opened, toggle}:Props){
  const authStore = useAuthStore();
  console.log(authStore);
    return (
        <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            LOGO
        </Group>
      </AppShell.Header>
    )
}