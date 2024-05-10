
export class IHome{
    constructor(   
        public filename:string,
        public contentType:string,
        public data:string,
        public username:string,
        public uploadDate:string       
    ){}
};

export interface postResponse{
    filename:string,    
    filePath:string,
    datediff:string
}
export interface FileResponseRes{    
    files:string[]
};
   

