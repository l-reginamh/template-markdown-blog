import { siteConfig } from "@/config/site";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";

export function SiteFooter() {
    return (
        <footer>
            <div className="mb-6 mt-14 flex flex-col items-center">
                <div className="mb-3 flex space-x-4">
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
                </div>
                <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
                    <Link href={siteConfig.links.personalSite} target="_blank" rel="noreferrer">
                        {siteConfig.author}
                    </Link>
                </div>
            </div>
        </footer>
    )
}