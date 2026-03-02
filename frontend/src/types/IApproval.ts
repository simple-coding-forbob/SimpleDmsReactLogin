<<<<<<< Updated upstream
﻿export interface IApproval {
=======
﻿export  interface IApproval {
>>>>>>> Stashed changes
  aid?: number;
  docId: number | string;
  title: string;
  drafter?: number | string;
  approver: number | string;
  seq: number | string;
  status?: string;
  approveTime?: string;
  note?: string;
}
