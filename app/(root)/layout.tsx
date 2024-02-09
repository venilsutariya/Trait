import Navbar from "@/components/customUi/navbar";
import React from "react";

const RootLayout = ({
    children
}: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <div className="h-[8vh]">
                <Navbar />
            </div>
            {children}
        </div>
    );
}

export default RootLayout;