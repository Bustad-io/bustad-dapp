import { NavLink } from "react-router-dom";

interface TabProp {
    to: string;
    text: string;
}

function Tab({ to, text }: TabProp) {
    return (
        <NavLink className={({ isActive }) => isActive ? 'text-PrimaryHordeBlue bg-white font-bold py-3 px-9 rounded-xl' : 'px-8'} to={to} >{text}</NavLink>
    )
}

export function NavigationTab() {
    return (
        <nav className="bg-PrimaryHordeBlue rounded-xl h-11 text-white text-2xl flex items-center w-80 justify-between">
            <Tab text="Mint" to="/" />
            <Tab text="Governance" to="/governance" />
        </nav>
    )
}