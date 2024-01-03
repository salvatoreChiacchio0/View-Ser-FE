import { User } from "./user.model";


export class AuthModel extends User{
    accessToken!:string
         constructor(auth:AuthModel){
            super(auth);
            this.accessToken = auth.accessToken,
            this.email = auth.email
            this.id = auth.id
            this.name = auth.name
        }
    
    
}