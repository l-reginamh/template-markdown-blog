"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { Icons } from "../icons";
import { ThemeToggle } from "./themeToggle";

export function SideNav() {
    return (
        <>
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
                <div className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0")}>
                    <Icons.github className="h-4 w-4" />
                    <span className="sr-only">Github</span>
                </div>
            </Link>
            <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
                <div className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0")}>
                    <Icons.twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                </div>
            </Link>
            <ThemeToggle />
        </>
    );
}