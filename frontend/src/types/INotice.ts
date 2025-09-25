export default interface INotice {
    nid?: number;
    title: string;
    content: string;
    isVisible?: string;
    startDate?: string | null;
    endDate?: string | null;
}