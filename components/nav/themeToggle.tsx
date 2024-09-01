"use client"

import { useTheme } from "next-themes"
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button variant="ghost" className="w-10 px-0" onClick={() => setTheme(
            theme === "dark" ? "light" : "dark"
          )}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle Theme</span>
        </Button>
    );
}