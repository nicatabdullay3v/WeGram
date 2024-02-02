export interface Users {
    _id: string,
    img: string,
    name: string,
    isPublic: boolean,
    username:string
    posts: [
        {
            likes: [],
            time: string,
            img: File,
            id: string,
            userId: string
        }
    ],
    followers: [],
    followings: [],
    requests: []
}
export interface UsersState {
    users: Users[]
}