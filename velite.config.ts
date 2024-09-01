import { defineConfig, s } from 'velite'
import rehypeSlug from "rehype-slug"
import  rehypePrettyCode from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

export default defineConfig({
    root: "content",
    output: {
        data: ".velite",
        assets: "public/static",
        base: "/static/",
        name: "[name]-[hash:6].[extension]",
        clean: true,
    },
    collections: {
        posts: {
            name: 'Post', // collection type name
            pattern: 'posts/**/*.mdx', // content files glob pattern
            schema: s
                .object({
                    slug: s.path(), // validate format, unique in posts collection
                    title: s.string().max(99), // Zod primitive type
                    description: s.string().max(999).optional(),
                    date: s.isodate(), // input Date-like string, output ISO Date string.
                    tags: s.array(s.string()).optional(),
                    published: s.boolean().default(false),
                    body: s.mdx(),
                })
                // more additional fields (computed fields)
                .transform(data => ({ ...data, slugAsParams: data.slug.split("/").slice(1).join("/") }))
        },
        cheatsheets: {
            name: 'Cheatsheet', // collection type name
            pattern: 'cheatsheets/**/*.mdx', // content files glob pattern
            schema: s
                .object({
                    slug: s.path(), // validate format, unique in posts collection
                    title: s.string().max(99), // Zod primitive type
                    description: s.string().max(999).optional(),
                    date: s.isodate(), // input Date-like string, output ISO Date string.
                    tags: s.array(s.string()).optional(),
                    published: s.boolean().default(false),
                    body: s.mdx(),
                })
                // more additional fields (computed fields)
                .transform(data => ({ ...data, slugAsParams: data.slug.split("/").slice(1).join("/") }))
        }
    },
    mdx: {
        rehypePlugins: [
            rehypeSlug, 
            [rehypePrettyCode, {theme: "one-dark-pro"}], 
            [
                rehypeAutolinkHeadings,
                {
                    behavior: "wrap",
                    properties: {
                        className: ["subheading-anchor"],
                        ariaLabel: "Link to section",
                    },
                },
            ],
        ],
        remarkPlugins: [],
    }
})