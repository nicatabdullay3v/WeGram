export interface Users {
    _id: string,
    img: string,
    name: string,
    isPublic: boolean,
    posts: [],
    followers: [],
    followings: [],
    requests: []
}
export interface UsersState {
    users: Users[]
}