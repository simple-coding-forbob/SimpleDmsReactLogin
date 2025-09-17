export default interface IEventNotice {
    eid?: number,
    subject: string,
    text: string,
    isVisible?: string,
    startDate?: string | null,
    endDate?: string | null
}