export default interface IQna {
    qno?: number,
    questioner: string,
    question: string,
    answerer: string | null,
    answer: string | null
}