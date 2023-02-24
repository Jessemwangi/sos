
export interface Guser{
    name: string
    email: string
    picture: string
    iat: number
    iss: string  
    jti:string
}

export interface Profile{
    id:number | null
    firstname: string,
    lastname:string,
    contact: number | null,
    altcontact:number | null,
    occupation: string
    dob: Date | null,
    uid: string,
    email: string,
    userName: string,
    addressline1: string,
    addressline2: string,
    city: string,
    state_province: string,
    postalcode: string
    country: string
    createdon:Date | null
}

interface Recipients{
    name:string
}

export interface signalsList
{
    signalId: number,
    uid:string,
    name:string,
    recipient: Recipients[],
    presetMsg:string,
    cstTextId:number,
    createdAt:Date
}

interface geoCoodes{
    lat: number,
    lgn:number
}
 
export interface signals
    {
      signalsId: number,
      uid: string,
      createdAt: Date,
      geoLocation: geoCoodes
}
export interface cutomTexts{
    cstTextId:number
    message: string
    title:string
    }