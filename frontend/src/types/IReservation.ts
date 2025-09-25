export default interface IReservation {
    rid?: number;
    email: string;
    mid: number|string;
    roomName: string;
    startTime: string;
    endTime: string;
    status?: string;
}