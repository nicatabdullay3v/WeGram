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

            ]
        }
    ],
    followers: [],
    followings: [],
    requests: []
}
export interface UsersState {
    users: Users[],
    user: Users | null
}