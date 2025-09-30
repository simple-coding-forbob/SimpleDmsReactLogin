export default interface IApproval {
  aid?: number;
  uuid: string;
  title: string;
  approver: number | string;
  seq: number | string;
  status?: string;
  approveTime?: string;
  note?: string;
}
