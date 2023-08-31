const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result;
}

export const getorCreateRoom = () => {
    const roomId = localStorage.getItem("roomId");
    if (roomId) {
        return roomId;
    } else {
        const newRoomId = generateRandomString(10);
        localStorage.setItem("roomId", newRoomId);
        return newRoomId;
    }
}