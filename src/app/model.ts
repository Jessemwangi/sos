export interface SignUpData {
    email: string
    password: string
    firstname: string
    lastname: string
    confirmPassword: string
}

export interface SignInData {
    email: string
    password: string
}

export type LoadingState = boolean

export interface Profile {
    firstname?: string,
    lastname?: string,
    phone?: number | string | null,
    altphone?: number | string | null,
    occupation?: string
    dob?: Date | null,
    uid?: string,
    email?: string,
    username?: string,
    addressline1?: string,
    addressline2?: string,
    city?: string,
    state_province?: string,
    postcode?: string
    country?: string
    createdAt?: Date | null | string
}

export interface Recipient {
    id: string,
    createdAt?: string,
    name: string,
    address: string,
    phone: string,
    city: string,
    postcode: string,
    userId: string,
    email: string

}

export interface SignalsList {
    signalId: string,
    uid: string,
    name: string,
    recipients: string[],
    presetMsg?: string | undefined,
    cstTextId?: string | undefined,
    createdAt?: Date | string
}

export interface GeoCodes {
    lat: number,
    lon: number
}

export interface Signal {
    signalId: string,
    uid: string | undefined,
    createdAt: Date | string,
    geolocation: GeoCodes
}

export interface CustomText {
    cstTextId: string
    message: string
    title: string
    userId: string | undefined
}