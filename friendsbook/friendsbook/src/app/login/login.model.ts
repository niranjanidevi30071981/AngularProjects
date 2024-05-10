export class ILogin{
    constructor(
        public userName:string,
        public password:string
    ){}
    }
   
export class LoginRes{
    constructor(
        public auth:string,
        public token:string,
        public imageName:string,
		public role:string
    ){}
}
export interface userRes
{
         _id:string,
		firstname:string,
		lastname: string,
		email: string ,
		password:string ,
		DOB:string ,
		gender:string ,
		phoneno:string,
		role: string ,
		image:string,
		address:string,
		city:string,
		state:string,
		country:string,
		accountBlock:boolean,
		createdAt:string ,
		updatedAt:string ,
		__v: 0
}

