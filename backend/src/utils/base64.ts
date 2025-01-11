export const isBase64 = (profilePicture: string): boolean => {
    const base64Pattern = /^data:image\/(png|jpg|jpeg|gif);base64,[A-Za-z0-9+\/=]+$/;
    return base64Pattern.test(profilePicture);
};
