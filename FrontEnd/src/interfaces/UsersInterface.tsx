export interface Users {
    _id: string,
    profilePicture: string,
    isPublic: boolean,
    username: string
    posts: [
        {
            likes: [],
            time: string,
            img: File,
            id: string,
            userId: string,
            comments: [

            ],
            title:string 
        }
    ],
    followers: [],
    followings: [],
    requests: [],
    surname:string,
    bio:string,
    blockList:[],
    backGroundPicture:string,
    email:string,
    Admin:boolean,
    stories:[]
}
export interface UsersState {
    users: Users[],
    user: Users | null
}