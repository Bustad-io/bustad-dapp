import { ReactComponent as Arrow } from '../assets/icons/Arrow_up_right.svg';

export interface AnnouncementBoxProps {
    title: string;
    text: string;
    link?: string;
    bgColor: string;
}

export function AnnouncementBox({ text, title, link, bgColor }: AnnouncementBoxProps) {
    return (
        <a href={link} className={`flex flex-col rounded-lg relative ${bgColor} px-3 py-2 w-full`}>
            <div className='flex items-center space-x-1'>
                <span className={`text-sm font-semibold`}>{title}</span>
                <Arrow className='-top-[2px] relative' />
            </div>
            <span className={`text-sm`}>{text}</span>
        </a>
    );
} 