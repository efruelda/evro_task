'use client'

import { Header } from "../_components/base/Header";

const routeLayout = ({
    children
}: {
    children: JSX.Element
}) => {
    return (
        <div className="w-full h-full">
            <header>
                <Header/>
            </header>
            <main className="flex h-full overflow-hidden w-full">
             
                <div className="w-full">
                    {children}
                </div>
            </main>
        </div>
    )
};     

export default routeLayout;