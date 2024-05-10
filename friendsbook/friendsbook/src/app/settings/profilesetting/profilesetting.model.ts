export class IProfile{
    constructor(
        public _id:string,
        public firstname:string,
        public lastname:string,
        public email:string, 
        public phoneno:string,       
        public DOB: string,
        public gender:string,        
        public role:string,
        public image:string,
        public address:string,
        public city:string,
        public state:string,
        public country:string
    ){}
}