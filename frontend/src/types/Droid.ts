export type Droid = Readonly<{
    id: string,
    name: string,
    description: string,
    order: number,
    activated: boolean,
    hint: string,
    imageUrl: string
}>