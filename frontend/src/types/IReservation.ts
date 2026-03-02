<<<<<<< Updated upstream
﻿export interface IReservation {
=======
﻿export  interface IReservation {
>>>>>>> Stashed changes
    rid?: number;
    email: string;
    mid: number|string;
    roomName: string;
    startTime: string;
    endTime: string;
    status?: string;
}