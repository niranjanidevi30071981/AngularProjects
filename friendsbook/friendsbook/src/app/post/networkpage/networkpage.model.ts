export interface UsersList{
    filePath:string,
    filename:String,
    firstName:string
}

export interface FriendsListRes{
    
    _id:string,
    sourceUser:string,
    requestUser:String,
    requestStatus:string,
    createdAt:string,
    updatedAt:string,
    pendingstatus:boolean,
    sendStatus:boolean,
    acceptStatus:boolean,
    rejectStatus:boolean
}

export interface networkUserRes
{
        _id:string,	
        image:string,
        RequestUserfirstname:string,
		RequestUserlastname: string,
        RequestStatus:string,		
        pendingstatus:boolean,
        sendStatus:boolean,
        acceptStatus:boolean,
        rejectStatus:boolean
}


