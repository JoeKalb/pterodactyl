export class UserInfo{


    public username:string = ""
    public displayName:string = ""
    public color:string = ""
    public badgeInfo:string = ""
    public emoteSets:number[] = []

    public constructor(info:{ [index:string]:any }){
        
    }
}