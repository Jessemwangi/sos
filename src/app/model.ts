
export interface Guser{
    name: string
    email: string
    picture: string
    iat: number
    iss: string  
    jti:string
}

export interface Profile{
    uid: string,
    email: string,
    userName: string,
    DOB: Date,
    contact: number,
    streetAddress: string,
    occupation: string
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
    id:number
    message: string
    title:string
    }