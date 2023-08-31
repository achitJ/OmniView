import Dashboard from "@/components/DashBoard"
import SideBar from "@/components/SideBar"

export default function Home() {

    return (
        <div className="w-full flex justify-between mt-6 px-0 md:px-6">
            <div className="hidden sm:block w-1/6">
                <SideBar />
            </div>
            <div className="w-full sm:w-5/6">
                <Dashboard />
            </div>
        </div>
    )
}
