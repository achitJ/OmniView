"use client"

import config from "@/config"
import { useDataStore } from "@/stores/data"
import { IconHome } from "@tabler/icons-react"
import channelPromise from "@/api/pieSocket"

const { datas, dataIcons } = config

export default function SideBar() {
    const currentData = useDataStore(state => state.currentData)
    const setCurrentData = useDataStore(state => state.setCurrentData)

    return (
        <>
            <div className="text-lg flex gap-1 capitalize">
                <span>
                    <IconHome size={24} stroke={1.2} />
                </span>
                Dashboard
            </div>
            <div className="text-md mt-8 uppercase opacity-30">
                analytics
            </div>
            {
                datas.map((data, index) => {
                    const Icon = dataIcons[data];
                    const color = currentData === data ? "text-blue-500" : "";

                    return (
                        <div 
                            className={`text-lg flex mt-8 gap-1 capitalize cursor-pointer ${color}`} 
                            key={data + index}
                            onClick={() => {
                                setCurrentData(data);
                                channelPromise.then((channel) => {
                                    channel.publish("data-change", data);
                                })
                            }}
                        >
                            <span>
                                <Icon size={24} />
                            </span>
                            {data}
                        </div>
                    )
                }
                )
            }
        </>
    )
}