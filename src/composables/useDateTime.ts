export const useDateTime = (): string => {
    const [year, month, day] = new Date().toISOString().split('-')
    return `${year}-${month}-${day}`
}