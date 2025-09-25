export default interface IBooking {
    bid?: number;
    email: string;
    pid: number|string;
    carName: string;
    startTime: string;
    endTime: string;
    status?: string;
}