export default interface IApproval {
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
