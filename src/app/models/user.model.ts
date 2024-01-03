export interface IUser{
    id:	number
    name:	string
    email:	string
    schedule:	string[]
}

export class User{
    id!:	number
    name!:	string
    email!:	string
    schedule!:	string[]  

    constructor(user:IUser){
        this.id = user.id,
        this.name  =user.name,
        this.email = user.email,
        this.schedule = user.schedule
    }
}