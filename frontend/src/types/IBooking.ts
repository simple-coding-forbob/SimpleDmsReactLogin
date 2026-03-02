<<<<<<< Updated upstream
﻿export interface IBooking {
=======
﻿export  interface IBooking {
>>>>>>> Stashed changes
    bid?: number;
    email: string;
    pid: number|string;
    carName: string;
    startTime: string;
    endTime: string;
    status?: string;
}