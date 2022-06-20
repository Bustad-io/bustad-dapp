import { Link, NavLink } from "react-router-dom";
import { AccountButton } from "./AccountButton";

export function NavigationTag() {
    return (
        <div className="w-full max-w-md px-2 py-16 sm:px-0">
            <nav className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <NavLink className={({ isActive }) =>
                    isActive ? 'bg-white w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2' : 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                }
                    to={"/"} >Mint</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive ? 'bg-white w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2' : 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                }
                    to={"/governance"} >Governance</NavLink>
            </nav>
            <AccountButton/>
        </div>

    )
}