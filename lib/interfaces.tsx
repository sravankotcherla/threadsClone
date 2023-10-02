export default interface UserInterface {
    _id?: string;
    userId: string;
    name: string;
    username: string;
    profile_photo: string;
    bio: string;
    onboarded: boolean;
    threads?: Object[];
}