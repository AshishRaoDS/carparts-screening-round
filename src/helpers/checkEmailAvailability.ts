import { DocumentData } from "firebase/firestore"

export const isEmailAvailable = (email: string, allUsersInDB: DocumentData) => {
    let isEmailValid = true
    allUsersInDB.forEach((user: DocumentData) => {
        if (user.email === email) {
            isEmailValid = false
            return
        }
    })

    return isEmailValid;
}


