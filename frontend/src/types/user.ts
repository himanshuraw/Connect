export interface UserData {
    id: number;
    username: string;
    profilePictureUrl: string | null;
    isPrivate: boolean;
    about: string | null;
    postCount: number;
    followerCount: number;
    followingCount: number;
}

export interface User {
    id: number;
    email: string;
    username: string;
}

export interface AuthState {
    token: string | null;
    user: User | null;
    loading: boolean;
    error: string | null;
}