
export interface Guser {
    name: string
    email: string
    picture: string
    iat: number
    iss: string
    jti: string
    sub: number | string
}
export interface EncryptGuser{
    encryptedUserData:string | null
}
export type LoadingState = boolean 

export interface Profile {
    id: number | string
    firstname: string,
    lastname: string,
    contact: number | null,
    altcontact: number | null,
    occupation: string
    dob: Date | null,
    uid: string,
    email: string,
    username: string,
    addressline1: string,
    addressline2: string,
    city: string,
    state_province: string,
    postalcode: string
    country: string
    createdon: Date | null
}

export interface Recipient {
    id: string,
    createdAt: string,
    name: string,
    address: string,
    phone: string,
    city: string,
    postcode: string,

}

export interface signalsList {
    signalId: number,
    uid: string,
    name: string,
    recipientId: string[],
    presetMsg: string,
    cstTextId: number,
    createdAt: Date
}

interface geoCodes {
    lat: number,
    lon: number
}

export interface signals {
    signalsId: number,
    uid: string,
    createdAt: Date,
    geoLocation: geoCodes
}

export interface customTexts {
    cstTextId: number
    message: string
    title: string
}