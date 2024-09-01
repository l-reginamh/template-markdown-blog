import { cheatsheets } from "#site/content";
import { SheetItem } from "@/components/cheatsheetItem";
import { sortPosts } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cheatsheets",
    description: "Reggie's lovie dovie cheatsheets."
}

export default async function CheatsheetsPage() {
    const sortedSheets = sortPosts(cheatsheets.filter((sheet) => sheet.published))
    const displaySheets = sortedSheets;
    return (
        <div className="container max-w-4xl py-6 lg:py-10">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
                <div className="flex-1 space-y-4">
                    <h1 className="inline-block font-black text-4xl lg:text-5xl">Cheatsheets</h1>
                    <p className="text-xl text-muted-foreground">
                        Reggie's lovie dovie cheatsheets.
                    </p>
                </div>
            </div>
            <hr className="mt-8" />
            {displaySheets?.length > 0 ? (
                <ul className="flex flex-col">
                    {displaySheets.map(sheet => {
                        const {slug, date, title, description, tags} = sheet
                        return (
                            <li key={slug}>
                                <SheetItem
                                    slug={slug}
                                    title={title}
                                    description={description}
                                    date={date}
                                    tags={tags}
                                />
                            </li>
                        )
                    })}
                </ul>
                )
                :
                <p>Reggie has nothing to show here yet.</p>
            }
        </div>
    );
}