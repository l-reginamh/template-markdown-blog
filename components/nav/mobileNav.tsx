"use client";

import { siteConfig } from "@/config/site";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { SideNav } from "./sideNav";

export function MobileNav() {
    const [open, setOpen] = useState(false);
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant={"outline"} className="w-10 px-0 sm:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Theme</span>
                </Button>
            </SheetTrigger>
            <SheetContent side={"right"}>
                <MobileLink href="/" className="flex items-center">
                    <span className="font-bold">{siteConfig.name}</span>
                </MobileLink>
                <div className="flex flex-col gap-3 mt-5">
                    <MobileLink onOpenChange={setOpen} href="/posts" className="ml-2 text-sm font-medium transition-colors">
                        /posts
                    </MobileLink>
                    <MobileLink onOpenChange={setOpen} href="/cheatsheets" className="ml-2 text-sm font-medium transition-colors">
                        /cheatsheets
                    </MobileLink>
                    <div className="flex flex-row mt-5">
                        <SideNav />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

interface MobileLinkProps extends LinkProps {
    children: React.ReactNode,
    onOpenChange?: (open: boolean) => void;
    className?: string;
}

function MobileLink({
    href,
    onOpenChange,
    children,
    className,
    ...props
}: MobileLinkProps)  {
    const router = useRouter();
    return (
        <Link
            href={href}
            onClick={() => {
                router.push(href.toString());
                onOpenChange?.(false);
            }}
            className={className}
            {...props}
        >
            {children}
        </Link>
    );
}