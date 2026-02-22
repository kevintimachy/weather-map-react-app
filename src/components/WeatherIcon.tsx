import clsx from 'clsx'

type Props = {
    src: string
    className?: string
}

export default function WeatherIcon({ src, className }: Props) {
    return (
        <img
            className={clsx("size-8", className)}
            src={`https://openweathermap.org/payload/api/media/file/${src}.png`}
            alt="Weather Icon"
        />
    )
}