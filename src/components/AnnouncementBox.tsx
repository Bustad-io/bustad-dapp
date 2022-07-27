export interface AnnouncementBoxProps {
    text: string;
    children: JSX.Element;
    link?: string;
}

export function AnnouncementBox({text, children, link}: AnnouncementBoxProps) {
    return (        
        <div className="bg-Anakiwa flex pl-3 pr-2 sm:pr-5 py-2 rounded-md sm:rounded-xl items-center relative">
            <div className="hidden sm:block mr-3">{children}</div>
            <span className="sm:text-sm text-[0.61rem]">{text}</span>
            {link && <a href={link} target="_blank" rel="noopener noreferrer" className="ml-3 text-2xs border border-black rounded-xl py-1 px-2 font-semibold right-5 sm:absolute">Read more</a>}
        </div>                
    );
} 