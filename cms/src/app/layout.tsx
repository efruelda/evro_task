import '@mantine/core/styles.css';
import type { Metadata } from "next";
import { AxiosInterceptor } from "./config/axiosInterceptor";
import { MantineProvider } from '@mantine/core';
import QueryClientWrapper from './_components/Base/QueryClientWrapper';

export const metadata: Metadata = {
  title: "CMS Practice",
  description: "Created by eRmeL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientWrapper>
      <AxiosInterceptor>        
      <html lang="en">
        <body className="flex items-center">    
          <MantineProvider defaultColorScheme="dark"> 
            {children}
          </MantineProvider>    
        </body>
      </html>        
      </AxiosInterceptor>
    </QueryClientWrapper>
  );
}
