
export type User = Readonly<{
    id: string;
    name: string;
    deviceId: string;
    rank: string;
    collectedDroids: Array<object>;
}>;