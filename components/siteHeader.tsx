"use client";

import { MainNav } from "./nav/mainNav";
import { SideNav } from "./nav/sideNav";
import { MobileNav } from "./nav/mobileNav";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { posts, cheatsheets } from "../.velite"
import { KBarProvider, Priority, useKBar } from "kbar";
import { siteConfig } from "@/config/site";
import { useMemo } from "react";
import { SearchBar } from "./nav/searchBar";
import CommandPortal from "./commandPortal";

const ACTION_KEY_DEFAULT = "CTRL"
const ACTION_KEY_APPLE = "⌘"
function isAppleDevice() {
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
}

export function SiteHeader() {
    const pathname = usePathname()
    const router = useRouter()
    
    const key = useMemo(() => {
      if (typeof navigator !== "undefined") {
        return isAppleDevice() ? ACTION_KEY_APPLE : ACTION_KEY_DEFAULT
      }
    }, [])

    function getActions() {
        const actions = [
            {
              id: "homepage",
              name: "Homepage",
              keywords: "",
              section: "Home",
              perform: () => router.push("/"),
              priority: Priority.HIGH,
            },
            {
              id: "posts",
              name: "Posts",
              keywords: "blog posts content notes",
              section: "Home",
              perform: () => router.push("/posts"),
              priority: Priority.HIGH,
            },
            {
              id: "cheatsheets",
              name: "Cheatsheets",
              keywords: "sheets cheatsheets cheatsheet notes",
              section: "Home",
              perform: () => router.push("/cheatsheets"),
              priority: Priority.HIGH,
            },
            {
              id: "twitter",
              name: "Twitter",
              keywords: "contact twitter tweet",
              section: "Contact",
              perform: () => window.open(`${siteConfig.links.twitter}`, "_blank"),
              priority: Priority.HIGH,
            },
            {
              id: "github",
              name: "GitHub",
              keywords: "contact git GitHub projects showcase repo",
              section: "Contact",
              perform: () => window.open(`${siteConfig.links.github}`, "_blank"),
              priority: Priority.HIGH,
            },
        ]
    
        for (const post of posts) {
          actions.push({
                id: post.slugAsParams,
                name: post.title,
                keywords: post?.title || "",
                section: "Posts",
                perform: () => router.push("/" + post.slug),
                priority: Priority.NORMAL
              })
        }
    
        for (const sheet of cheatsheets) {
          actions.push({
                id: sheet.slugAsParams,
                name: sheet.title,
                keywords: sheet?.title || "",
                section: "Cheatsheets",
                perform: () => router.push("/" + sheet.slug),
                priority: Priority.NORMAL
              })
        }
    
        return actions;
    }


    return (
        <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filyer]:bg-background/60">
            <div className="container flex h-14 min-w-full max-w-screen-2xl items-center">
                {pathname !== "/" ? 
                    (<Button onClick={router.back}>Back</Button>)
                    :
                    null
                }
                <KBarProvider actions={getActions()}>
                    <SearchBar
                        onClick={() => {
                            const ctrlkey = new KeyboardEvent("keydown", {altKey:false,
                                bubbles: true,
                                cancelable: true,
                                charCode: 0,
                                code: "Ctrl",
                                composed: true,
                                ctrlKey: true,
                                detail: 0,
                                isComposing: false,
                                key: "Ctrl",
                                keyCode: 17,
                                location: 0,
                                metaKey: false,
                                repeat: false,
                                shiftKey: false,
                                which: 17});
                            const kKey = new KeyboardEvent("keydown", {altKey:false,
                                bubbles: true,
                                cancelable: true,
                                charCode: 0,
                                code: "k",
                                composed: true,
                                ctrlKey: true,
                                detail: 0,
                                isComposing: false,
                                key: "k",
                                keyCode: 107,
                                location: 0,
                                metaKey: false,
                                repeat: false,
                                shiftKey: false,
                                which: 107});
                            document.dispatchEvent(ctrlkey);
                            document.dispatchEvent(kKey);
                        }}
                        kbd={key}
                    />
                    <CommandPortal actions={getActions()} />
                </KBarProvider>
                <nav className="flex flex-1 items-center sm:justify-center space-x-4 lg:space-x-6">
                    <MainNav />
                </nav>
                <nav className="flex items-center justify-end hidden sm:inline-flex">
                    <SideNav />
                </nav>
                <MobileNav />
            </div>
        </header>
    );
}