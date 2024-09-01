import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { Tag } from "./tag";

interface SheetItemProps {
    slug: string;
    title: string;
    description?: string;
    date: string;
    tags?: string[];
}

export function SheetItem({slug, title, description, date, tags}: SheetItemProps) {
    return (
        <article className="flex flex-col gap-2 border-border border-b py-3">
            <div>
                <h2 className="text-2xl font-bold">
                    <Link href={slug}>{title}</Link>
                </h2>
                <div className="flex gap-2">
                    {tags?.map(tag => (<Tag tag={tag} key={tag}></Tag>))}
                </div>
                <div className="flex justify-between items-center">
                    <dl>
                        <dt className="sr-only">Published On</dt>
                        <dd className="text-sm sm:text-base font-medium flex items-center gap1">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={date}>{formatDate(date)}</time>
                        </dd>
                    </dl>
                </div>
            </div>
        </article>
    );
}