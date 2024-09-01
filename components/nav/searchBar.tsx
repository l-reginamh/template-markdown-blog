import { Icons } from "../icons"

const ACTION_KEY_DEFAULT = "CTRL"

interface SearchBarProps {
  onClick?: () => void
  kbd?: string
}

export const SearchBar = ({
  onClick,
  kbd = ACTION_KEY_DEFAULT,
}: SearchBarProps) => {
  return (
    <button
      onClick={onClick}
      title="Search"
      className="mx-4 flex size-[34px] cursor-text items-center justify-center rounded-md border border-gray-800 bg-gray-50 px-2 text-sm hover:border-blue-600 hover:bg-gray-100 dark:border-gray-200 dark:bg-gray-900 dark:hover:border-blue-600 dark:hover:bg-gray-800 [@media(min-width:900px)]:w-[unset]"
    >
      <span className="my-2 block  w-4 [@media(min-width:900px)]:mr-2">
        <Icons.search />
      </span>
      <span className="mr-8 hidden text-slate-600 dark:text-slate-300 [@media(min-width:980px)]:block">
        Search...
      </span>
      <kbd
        className={`hidden  whitespace-nowrap rounded px-1 align-middle font-medium leading-4 tracking-wide [font-size:10px] [@media(min-width:900px)]:inline-block ${"border border-slate-400/70 text-slate-500 dark:border-slate-600 dark:text-slate-400"}`}
      >
        {kbd}
      </kbd>
      <kbd
        className={`ml-1 hidden whitespace-nowrap rounded px-1 align-middle font-medium leading-4 tracking-wide [font-size:10px] [@media(min-width:900px)]:inline-block ${"border border-slate-400/70 text-slate-500 dark:border-slate-600 dark:text-slate-400"}`}
      >
        K
      </kbd>
    </button>
  )
}