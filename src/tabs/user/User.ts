export default interface User {
    id: number | null;
    fullName: string;
    loginName: string;
    password: string | undefined;
}