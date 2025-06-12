import React, { useState } from "react";
import { Delete, Edit, MoreSquare, PaperPlus, Show, TimeCircle } from "react-iconly";
import { copyToClipboard, toFarsiNumber, typeOfEvent } from "../functions";
import { message, Popover } from 'antd';
import Link from "next/link";
import { Menu, Dropdown, Switch } from 'antd';
import { apiDeleteEventType, apiEditEventType } from "../../apis/apiEventType";
import useIsMounted from "../useIsMounted";
import Loading from "../loading/Loading";

const EventType = ({ data, setEventTypes, setEditEventType }) => {
    const { _id, title, duration, type, className, link, status, username } = data
    const [loading, setLoading] = useState(false)

    const isMounted = useIsMounted();

    const deleteEventType = () => {
        setLoading(true)
        if (!_id) return;
        const _data = {
            id: _id
        }
        apiDeleteEventType(_data)
            .then((result) => {
                if (!isMounted()) return;
                setLoading(false)
                const { success, statusCode, msg } = result

                if (success && statusCode === 200) {
                    message.success(msg)
                    setEventTypes(oldValue => oldValue.filter(eventType => eventType._id !== _id))
                    return
                }
                message.warn(msg)
            })
            .catch((err) => {
                if (!isMounted()) return;
                setLoading(false)
                message.error("ارتباط با سرور با مشکل مواجه شد")
                console.error(err)
            })
    }

    const editEventType = (editKey = "", editValue = "") => {
        setLoading(true)
        data[editKey] = editValue

        apiEditEventType(data)
            .then((result) => {
                if (!isMounted()) return;
                setLoading(false)
                const { success, statusCode, msg } = result

                if (success && statusCode === 200) {
                    message.success(msg)
                    setEventTypes(oldValue => oldValue.filter(eventType => {
                        if (eventType._id !== _id) return eventType
                        return data
                    }))
                    return
                }
                message.warn(msg)
            })
            .catch((err) => {
                if (!isMounted()) return;
                setLoading(false)
                message.error("ارتباط با سرور با مشکل مواجه شد")
                console.error(err)
            })
    }


    const menu = (
        <Menu
            onClick={({ key }) => {
                const keys = {
                    "edit": () => {
                        setEditEventType(data)
                        window.scrollTo(0, 0)
                    },
                    "delete": () => deleteEventType(),
                    "status": () => editEventType("status", !status),
                }

                keys[key]()
            }}
        >
            <Menu.Item key="edit">
                <div>
                    ویرایش
                    <Edit />
                </div>
            </Menu.Item>
            <Menu.Item key="delete">
                <div>
                    حذف
                    <Delete />
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="status">
                <div>
                    وضعیت
                    <Switch
                        checkedChildren={<span>فعال</span>}
                        unCheckedChildren={<span>غیر فعال</span>}
                        checked={status}
                    />
                </div>
            </Menu.Item>
        </Menu>
    );



    return (
        <React.Fragment>
            {
                loading && <Loading />

            }

            <div className={`eventType ${!status && "inactive"}`}>
                <div className="header">
                    <span className="title">
                        <Popover
                            placement="bottomRight"
                            content={title}
                            trigger="hover"
                        >
                            {title}
                        </Popover>
                    </span>

                    <Dropdown
                        overlay={menu}
                        trigger={['click']}
                        overlayClassName="dropdownMenuEventTypes"
                    >
                        <span
                            className="cursor-pointer"
                        >
                            <MoreSquare />
                        </span>
                    </Dropdown>


                </div>

                <div className={`body ${className}`}>
                    <div className="duration">
                        <TimeCircle />
                        <span>
                            {toFarsiNumber(duration)}
                        </span>
                    </div>

                    <span
                        id={type}
                        className="type"
                    >
                        {typeOfEvent(type)}
                    </span>
                </div>

                <div className="footer">
                    <span className="link">
                        <Link href={"reserve/" + username + "/" + link}>
                            {"/" + link}
                        </Link>
                    </span>

                    {
                        status ?
                            <button
                                onClick={() =>
                                    copyToClipboard("https://peaky-pouria-seifi.herokuapp.com/" + "reserve/" + username + "/" + link, "لینک رویداد کپی شد")
                                }
                                className="mainColor1Button"
                            >
                                <PaperPlus />
                                کپی لینک
                            </button>
                            :
                            <button
                                onClick={() => editEventType("status", true)}
                                className="activeEvent"
                            >
                                <Show />
                                فعال کردن
                            </button>
                    }

                </div>
            </div>
        </React.Fragment>

    );
}

export default EventType;