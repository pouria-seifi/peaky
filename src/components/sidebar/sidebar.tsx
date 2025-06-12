import React, { useState } from "react";
import { ArrowRightSquare, Calendar, Plus, TimeSquare } from "react-iconly";
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Drawer, message } from 'antd'

const Sidebar = () => {
    const [visible, setVisible] = useState(false);
    const router = useRouter()

    return (
        <div id="Sidebar">

            <div className="mobileHeader">
                <div className="wrapper">
                    <div className="logoWrapper">
                        <Image
                            src="/images/logo.png"
                            alt="logo"
                            layout="fixed"
                            width={37}
                            height={37}
                        />
                    </div>
                    <Image
                        src="/illus/hamburgerIcon.svg"
                        alt="hamburgerIcon"
                        layout='fixed'
                        width={35}
                        height={35}
                        onClick={() => setVisible(true)}
                    />
                </div>
            </div>

            <Drawer
                title="Peaky"
                placement="right"
                closable={true}
                visible={visible}
                onClose={() => setVisible(false)}
                width={200}
                className="mobileSidebarDrawer"
            >
                <div className="routes">
                    <ul>
                        <li
                            className={`${router.pathname === "/reservedEvents" ? "active" : ""}`}
                            onClick={() => router.push("/reservedEvents")}
                        >
                            <Calendar />رویداد های هماهنگ شده
                        </li>

                        <li
                            className={`${router.pathname === "/eventTypes" ? "active" : ""}`}
                            onClick={() => router.push("/eventTypes")}
                        >
                            <TimeSquare />رویداد های شما
                        </li>

                        <li
                            className={`${router.pathname === "/createEventType" ? "active" : ""}`}
                            onClick={() => router.push("/createEventType")}
                        >
                            <Plus />ایجاد نوع رویداد جدید
                        </li>

                        <li onClick={() => {
                            message.success("خارج شدید")
                            localStorage.removeItem("token");
                            router.push("/")
                        }}>
                            <ArrowRightSquare />
                            خروج
                        </li>
                    </ul>
                </div>
            </Drawer>
            <div id="LaptopSidebar">
                <div className="sidebar">
                    <div className="logoWrapper">
                        <Image
                            src="/images/logo.png"
                            alt="logo"
                            layout="fixed"
                            width={110}
                            height={110}
                        />
                        <h5>Peaky</h5>
                    </div>

                    <div className="routes">
                        <ul>
                            <li
                                className={`${router.pathname === "/reservedEvents" ? "active" : ""}`}
                                onClick={() => router.push("/reservedEvents")}
                            >
                                <Calendar />رویداد های هماهنگ شده
                            </li>

                            <li
                                className={`${router.pathname === "/eventTypes" ? "active" : ""}`}
                                onClick={() => router.push("/eventTypes")}
                            >
                                <TimeSquare />رویداد های شما
                            </li>

                            <li
                                className={`${router.pathname === "/createEventType" ? "active" : ""}`}
                                onClick={() => router.push("/createEventType")}
                            >
                                <Plus />ایجاد نوع رویداد جدید
                            </li>

                            <li onClick={() => {
                                message.success("خارج شدید")
                                localStorage.removeItem("token");
                                router.push("/")
                            }}>
                                <ArrowRightSquare />
                                خروج
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Sidebar;