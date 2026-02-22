import { type ReactNode } from 'react'

type Props = {
    children: ReactNode
    title: string
    childrenClassName?: string
}

export default function Card({ children, title, childrenClassName }: Props) {
    return (
        <div className='h-full p-4 rounded-lg bg-zinc-900 shadow-md flex flex-col gap-4'>
            <h2 className='text-2xl font-semibold'>{title}</h2>
            <div className={childrenClassName ? `flex-1 ${childrenClassName}` : "flex-1"}>
                {children}
            </div>
        </div>
    )
}
