import React, { useEffect, useState } from "react";
import { apiCreateEventType, apiEditEventType } from '../../apis/apiEventType';
import { Form, Input, Button, Select, message } from 'antd';
import { ArrowLeft, Delete, Plus, TickSquare } from "react-iconly";
import useIsMounted from "../useIsMounted";
import { useRouter } from 'next/router'
import Loading from "../loading/Loading";

const CreateEditEventType = ({ title, backButton, EditEventType = {} }) => {
    const isMounted = useIsMounted();
    const { Option } = Select;
    const { TextArea } = Input;
    const [postEventTypeLoading, setPostEventTypeLoading] = useState(false);
    const [eventColor, setEventColor] = useState('');
    const router = useRouter()


    const [userFreeTime, setUserFreeTime] = useState({
        sat: [{ from: "09:00", to: "17:00" }],
        sun: [{ from: "09:00", to: "17:00" }],
        mon: [{ from: "09:00", to: "17:00" }],
        tue: [{ from: "09:00", to: "17:00" }],
        wed: [{ from: "09:00", to: "17:00" }],
        thu: [{ from: "09:00", to: "17:00" }],
        fri: [{ from: "09:00", to: "17:00" }]
    });

    const weekDays = [
        { faLabel: "شنبه", label: "sat" },
        { faLabel: "یک شنبه", label: "sun" },
        { faLabel: "دو شنبه", label: "mon" },
        { faLabel: "سه شنبه", label: "tue" },
        { faLabel: "چهار شنبه", label: "wed" },
        { faLabel: "پنج شنبه", label: "thu" },
        { faLabel: "جمعه", label: "fri" },
    ]

    const eventColors = [
        "eventColorMainColor1",
        "eventColorMainColor2",
        "eventColorDarkMainColor2",
        "eventColorGreen",
        "eventColorDarkGreen",
        "eventColorYellow",
        "eventColorDarkYellow",
        "eventColorRed",
        "eventColorDarkRed",
    ]

    const postEventTypeForm = (formData) => {
        setPostEventTypeLoading(true)
        const eventData = {
            _id: EditEventType._id,
            status: EditEventType.status,
            title: formData.title,
            duration: formData.hour,
            type: formData.eventType,
            className: eventColor || "eventColorMainColor1",
            description: formData.description || "",
            link: formData.eventLink,
            freeTimes: JSON.stringify(userFreeTime)
        }

        if (Object.keys(EditEventType).length) {
            //edit event type

            apiEditEventType(eventData)
                .then((result) => {
                    if (!isMounted()) return;
                    setPostEventTypeLoading(false)
                    const { success, statusCode, msg } = result

                    if (success && statusCode === 200) {
                        message.success(msg)
                        router.reload()
                        return
                    }
                    message.error(msg)
                })
                .catch((err) => {
                    if (!isMounted()) return;
                    setPostEventTypeLoading(false)
                    message.error("ارتباط با سرور با مشکل مواجه شد")
                    console.error(err)
                })

            return
        }

        apiCreateEventType(eventData)
            .then(result => {
                if (!isMounted()) return;
                setPostEventTypeLoading(false)
                const { statusCode, success, msg } = result
                if (statusCode === 415) {
                    message.error(msg)
                    return
                }
                if (success && statusCode === 200) {
                    message.success(msg)
                    router.push("/eventTypes")
                    return
                }

                message.error(msg)
            })
            .catch(err => {
                if (!isMounted()) return;
                setPostEventTypeLoading(false)
                message.error("ارتباط با سرور با مشکل مواجه شد")
                console.error(err)
            });
    }


    const options = () => {
        return (
            <React.Fragment>
                <Option value="07:00">07:00</Option>

                <Option value="08:00">08:00</Option>

                <Option value="09:00">09:00</Option>

                <Option value="10:00">10:00</Option>

                <Option value="11:00">11:00</Option>

                <Option value="12:00">12:00</Option>

                <Option value="13:00">13:00</Option>

                <Option value="14:00">14:00</Option>

                <Option value="15:00">15:00</Option>

                <Option value="16:00">16:00</Option>

                <Option value="17:00">17:00</Option>

                <Option value="18:00">18:00</Option>

                <Option value="19:00">19:00</Option>

                <Option value="20:00">20:00</Option>

                <Option value="21:00">21:00</Option>

                <Option value="22:00">22:00</Option>

                <Option value="23:00">23:00</Option>

                <Option value="24:00">24:00</Option>

            </React.Fragment>
        )
    }
    const freeTimeSelect = (dayLabel) => {
        if (!userFreeTime[dayLabel].length) {
            return (
                <div>خارج از دسترس</div>
            )
        }
        return (
            <div className="selectTime">
                {
                    userFreeTime[dayLabel].map((time, index) => (
                        <div className="mb-3" key={index}>
                            <Select
                                value={time.from}
                                onChange={(e) => {
                                    setUserFreeTime((prevState) => {
                                        prevState[dayLabel][index].from = e
                                        return { ...prevState }
                                    })
                                }}
                            >
                                {options()}
                            </Select>
                            <span className="m-2">-</span>
                            <Select
                                value={time.to}
                                onChange={(e) => {
                                    setUserFreeTime((prevState) => {
                                        prevState[dayLabel][index].to = e
                                        return { ...prevState }
                                    })
                                }}
                            >
                                {options()}
                            </Select>
                            <Delete
                                className="cursor-pointer mr-2"
                                primaryColor="#FF7070"
                                onClick={() => {
                                    setUserFreeTime((prevState) => {
                                        prevState[dayLabel].splice(index, 1)
                                        return { ...prevState }
                                    })
                                }}
                            />
                        </div>
                    ))
                }
            </div>
        )
    }

    useEffect(() => {
        if (!EditEventType.className) return
        setEventColor(EditEventType.className)
    }, [EditEventType])

    return (
        <div id="CreateEventType">
            {
                postEventTypeLoading && <Loading />
            }
            <div className="createEventTypeWrapper">

                <div className="CreateEventTypeHeader">
                    <span>{title}</span>
                    {
                        backButton &&
                        <span onClick={backButton}>
                            <ArrowLeft />
                        </span>
                    }

                </div>

                <Form
                    // name="createEventTypeForm"
                    onFinish={postEventTypeForm}
                    autoComplete="off"
                    layout="vertical"
                    className="createEventTypeForm"
                    initialValues={{
                        hour: EditEventType.duration || null,
                        eventType: EditEventType.type || null,
                        eventLink: EditEventType.link || null,
                        ...EditEventType
                    }}
                    scrollToFirstError={true}
                >

                    <Form.Item
                        label="عنوان"
                        name="title"
                        rules={[{ required: true, message: 'این فیلد الزامی است' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="مدت زمان"
                        name="hour"
                        className="newRadious"
                        rules={[
                            { required: true, message: 'این فیلد الزامی است' },
                            { pattern: /\d+/g, message: 'لطفا عدد وارد کنید' },
                            { max: 2, message: 'فرمت وارد شده اشتباه است' },
                        ]}
                    >
                        <Input
                            addonBefore="HH"
                            className="ltr"
                        />
                    </Form.Item>

                    <Form.Item
                        label="روش برگزاری"
                        name="eventType"
                        rules={[{ required: true, message: 'این فیلد الزامی است' }]}
                    >
                        <Select className="ltr">
                            <Option value="byPerson">حضوری</Option>
                            <Option value="phone">تماس تلفنی</Option>
                            <Option value="skype">skype</Option>
                            <Option value="googleMeet">Google meet</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="رنگ رویداد"
                        name="eventColor"
                    >
                        <div className="eventColors">
                            {
                                eventColors.map((className) =>
                                    <div
                                        key={className}
                                        className={`eventColor ${className} 
                                            ${eventColor === `${className}` ? "activeEventColor" : ""}`}
                                        onClick={() => setEventColor(className)}
                                    >
                                        <TickSquare
                                            className="h-100 m-auto"
                                            primaryColor="white"
                                        />
                                    </div>)
                            }

                        </div>
                    </Form.Item>

                    <Form.Item
                        label="توضیحات"
                        name="description"
                    >
                        <TextArea
                            rows={4}
                            placeholder="توضیحات"
                        />
                    </Form.Item>

                    <Form.Item
                        label="لینک رویداد"
                        name="eventLink"
                        rules={[
                            { required: true, message: 'این فیلد الزامی است' },
                            { pattern: /^\S+$/, message: 'فرمت وارد شده اشتباه است' },
                        ]}
                        className="eventLink newRadious"
                    >
                        <Input
                            addonBefore="reserve/username/"
                            className="ltr"
                        />
                    </Form.Item>

                    {
                        Object.keys(EditEventType).length ?
                            <React.Fragment />
                            :
                            <div>
                                <label>تعیین زمان های آزاد</label>
                                <div className="freeTime">
                                    {
                                        weekDays.map(day => (
                                            <div
                                                key={day.faLabel}
                                                className="days"
                                            >
                                                <div className="dayLabel">
                                                    <label>{day.faLabel}</label>
                                                    <Plus
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            setUserFreeTime((prevState) => {
                                                                prevState[day.label].push({ from: "09:00", to: "17:00" })
                                                                return { ...prevState }
                                                            })
                                                        }}
                                                    />
                                                </div>

                                                {
                                                    freeTimeSelect(day.label)
                                                }
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                    }


                    <Form.Item
                        className="saveEventTypeButton"
                    >
                        <Button
                            className="mainColor1Button m-auto"
                            htmlType="submit"
                            disabled={postEventTypeLoading}
                        >ذخیره
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default CreateEditEventType;