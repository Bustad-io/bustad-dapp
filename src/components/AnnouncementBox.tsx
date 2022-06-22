export interface AnnouncementBoxProps {
    text: string;
    children: JSX.Element;
    link?: string;
}

export function AnnouncementBox({text, children, link}: AnnouncementBoxProps) {
    return (        
        <div className="bg-Anakiwa flex pl-3 pr-5 py-2 rounded-xl items-center relative">
            <div className="mr-3">{children}</div>
            <span className="text-sm">{text}</span>
            {link && <a href={link} target="_blank" rel="noopener noreferrer" className="ml-3 text-2xs border border-black rounded-xl py-1 px-2 font-semibold right-5 absolute">Read more</a>}
        </div>                
    );
} 