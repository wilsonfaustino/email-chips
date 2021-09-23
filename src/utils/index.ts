// validate
export const isEmail = (email: string) => /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email)
// check for duplicates
export const isInList = (item: string, list: string[]) => list.includes(item)