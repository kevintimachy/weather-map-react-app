import { z } from "zod";

export const CurrentWeatherSchema = z.object({
    coord: z.object({
        lon: z.number(),
        lat: z.number(),
    }),

    weather: z.array(
        z.object({
            id: z.number(),
            main: z.string(),
            description: z.string(),
            icon: z.string(),
        })
    ),

    base: z.string(),

    main: z.object({
        temp: z.number(),
        feels_like: z.number(),
        temp_min: z.number(),
        temp_max: z.number(),
        pressure: z.number(),
        humidity: z.number(),
        sea_level: z.number().optional(),
        grnd_level: z.number().optional(),
    }),

    visibility: z.number().optional(),

    wind: z.object({
        speed: z.number(),
        deg: z.number(),
        gust: z.number().optional(),
    }),

    rain: z
        .object({
            "1h": z.number(),
        })
        .optional(),

    clouds: z.object({
        all: z.number(),
    }),

    dt: z.number(),

    sys: z.object({
        type: z.number().optional(),
        id: z.number().optional(),
        country: z.string().optional(),
        sunrise: z.number(),
        sunset: z.number(),
    }),

    timezone: z.number(),
    id: z.number(),
    name: z.string(),
    cod: z.number(),
});

export const ForecastWeatherSchema = z.object({
    city: z.object({
        id: z.number(),
        name: z.string(),
        coord: z.object({
            lon: z.number(),
            lat: z.number(),
        }),
        country: z.string(),
        population: z.number(),
        timezone: z.number(),
        sunrise: z.number(),
        sunset: z.number(),
    }),
    cod: z.string(),
    message: z.number(),
    cnt: z.number(),
    list: z.array(
        z.object({
            dt: z.number(),
            main: z.object({
                temp: z.number(),
                feels_like: z.number(),
                temp_min: z.number().optional(),
                temp_max: z.number().optional(),
                pressure: z.number(),
                sea_level: z.number().optional(),
                grnd_level: z.number().optional(),
                humidity: z.number(),
                temp_kf: z.number().optional(),
            }),
            weather: z.array(
                z.object({
                    id: z.number(),
                    main: z.string(),
                    description: z.string(),
                    icon: z.string(),
                })
            ),
            clouds: z.object({
                all: z.number(),
            }),
            wind: z.object({
                speed: z.number(),
                deg: z.number(),
                gust: z.number().optional(),
            }),
            visibility: z.number().optional(),
            pop: z.number().optional(),
            rain: z
                .object({
                    "3h": z.number().optional(),
                })
                .optional(),
            snow: z
                .object({
                    "3h": z.number().optional(),
                })
                .optional(),
            sys: z.object({
                pod: z.string(),
            }),
            dt_txt: z.string(),
        })
    ),
});
