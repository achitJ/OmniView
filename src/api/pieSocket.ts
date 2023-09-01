import PieSocket from 'piesocket-js';
import { getorCreateRoom } from '@/utils/socket'
import { useDataStore } from '@/stores/data';

const userId = "user_" + (Math.floor(Math.random() * 1000));
const pieSocket = new PieSocket({
    apiKey: process.env.NEXT_PUBLIC_PIESOCKET_API_KEY,
    cluster: process.env.NEXT_PUBLIC_PIESOCKET_CLUSTER,
    userId
});

export const channelPromise:Promise<any> = pieSocket.subscribe(getorCreateRoom());

channelPromise.then((channel) => {
    channel.listen('data-change', (data: DataString) => {
        useDataStore.getState().setCurrentData(data);
    });
}).catch((error) => {
    console.log(error);
});