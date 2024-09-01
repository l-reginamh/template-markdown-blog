"use client";

import { siteConfig } from "@/config/site";
import Link from "next/link";

export function MainNav() {
    return (
        <>
            <Link href="/" className="flex items-center">
                <span className="font-bold">{siteConfig.name}</span>
            </Link>
        </>
    );
}