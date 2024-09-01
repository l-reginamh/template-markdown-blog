import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

const innerBold = fetch(
    new URL(
        "../../../assets/fonts/Inter-Bold.ttf", 
        import.meta.url
    )
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
    try {
        const fontBold = await innerBold;

        const { searchParams } = req.nextUrl;
        const title = searchParams.get('title');

        if(!title) {
            return new Response("No title provided", { status: 500 })
        }

        const heading = title.length > 140 ? `${title.substring(0, 140)}...` : title;

        return new ImageResponse(
            (
                <div tw="flex relative flex-col p-12 w-full h-full items-start text-black bg-white">
                    <div tw="flex items-center text-[50px]">
                        {siteConfig.name}
                    </div>
                    <div tw="flex flex-col flex-1 py-15">
                        <div tw="flex text-xl uppercase font-bold tracking-tight font-normal">
                            SHARE NOTES
                        </div>
                        <div tw="flex font-bold text-[80px]">{heading}</div>
                    </div>
                    <div tw="flex items-center w-full justify-between">
                        <div tw="flex text-xl">{siteConfig.url}</div>
                        <div tw="flex items-center text-xl">
                            <div tw="flex ml-2">{siteConfig.links.github}</div>
                        </div>
                    </div>
                </div>
            ), {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: "Inter",
                        data: fontBold,
                        style: "normal",
                        weight: 700
                    }
                ]
            })
    } catch (err) {
        return new Response("Failed to generate image ", { status: 500 });
    }
}