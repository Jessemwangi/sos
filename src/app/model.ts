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
    firstname: string,
    lastname: string,
    phone: number | string | null,
    altphone?: number | string | null,
    occupation?: string
    dob?: Date | null,
    uid: string | undefined,
    email: string,
    username?: string,
    addressline1?: string,
    addressline2?: string,
    city: string,
    state_province?: string,
    postcode?: string
    country: string
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
    uid: string,
    email: string

}

export interface SignalsList {
    id: string,
    uid: string | undefined,
    name: string,
    recipients: string[],
    presetMsg?: string | undefined,
    cstTextId: string | undefined,
    createdAt?: Date | string,
    pinned?: boolean
    default?: boolean
}

export interface GeoCodes {
    lat: number,
    lng: number
}

export interface Signal {
    id: string,
    uid: string | undefined,
    createdAt: Date | string,
    geolocation: GeoCodes,
    signalType: string
}

export interface CustomText {
    id: string
    message: string
    title: string
    uid: string | undefined
    default: boolean
}