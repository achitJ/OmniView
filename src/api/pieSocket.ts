// @ts-nocheck
import PieSocket from 'piesocket-js';
import { getorCreateRoom } from '@/utils/socket'

const userId = "user_"+(Math.floor(Math.random() * 1000));
const pieSocket = new PieSocket({
    apiKey: process.env.NEXT_PUBLIC_PIESOCKET_API_KEY,
    cluster: process.env.NEXT_PUBLIC_PIESOCKET_CLUSTER,
    userId
});

(async () => {
    const channel = await pieSocket.subscribe(getorCreateRoom());

    export const sendMessage = (message) => {
        channel.publish(message)
    }
})();