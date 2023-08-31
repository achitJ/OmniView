import Image from 'next/image'
import { IconInbox, IconBell } from '@tabler/icons-react'
import SearchBar from './SearchBar'

export default function Header() {
    const iconSize = 32

    return (
        //make the header stretch to the width of the screen
        <header className="w-full h-16 flex items-center justify-between px-2 drop-shadow-sm border-b border-black-700 md:px-6">
            <Image
                src="/saasden.png"
                alt="saasden"
                width={56}
                height={40}
            />

            <div className="flex items-center justify-between w-3/4">
                <SearchBar />

                <div className="flex">
                    <IconInbox size={iconSize} stroke={1} />
                    <IconBell size={iconSize} stroke={1} />
                </div>
            </div>

        </header>
    )
}