import {
    Action,
    KBarAnimator,
    KBarPortal,
    KBarPositioner,
    KBarResults,
    KBarSearch,
    useMatches,
    useRegisterActions,
  } from "kbar";
import { useRouter } from "next/navigation";
  import React, { HTMLAttributes } from "react";
  
  interface CommandBarProps extends HTMLAttributes<HTMLElement> {
    actions: Action[];
  }
  
  const CommandPortal: React.FC<CommandBarProps> = ({ actions, children }) => {
    useRegisterActions(actions, [actions])
    const router = useRouter()

    return (
        <>
            <KBarPortal>
                <KBarPositioner className="bg-gray-300/50 p-4 backdrop-blur dark:bg-black/50">
                    <KBarAnimator className="w-full max-w-xl">
                        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex items-center space-x-4 p-4">
                        <span className="block w-5">
                            <svg
                            className="text-gray-400 dark:text-gray-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                            </svg>
                        </span>
                        <KBarSearch className="h-8 w-full bg-transparent text-slate-600 placeholder:text-slate-400 focus:outline-none dark:text-slate-200 dark:placeholder:text-slate-500" />
                        <span className="inline-block whitespace-nowrap rounded border border-slate-400/70 px-1.5 align-middle font-medium leading-4 tracking-wide text-slate-500 [font-size:10px] dark:border-slate-600 dark:text-slate-400">
                            ESC
                        </span>
                        </div>
                        <SearchResults />
                    </div>
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
            {children}
        </>
    );
  };
  
  const SearchResults = () => {
    const { results } = useMatches();
  
    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === "string" ? (
            // Section header
            <div className="text-sm uppercase px-4 pt-3 pb-1 text-neutral-500 font-bold">
              {item}
            </div>
          ) : (
            // Single action
            <div
              className={`text-black flex px-4 py-3 ${
                active ? "bg-[#eeeeee]" : "bg-transparent"
              }`}
            >
              {item.name}
            </div>
          )
        }
      />
    );
  };
  
  export default CommandPortal;