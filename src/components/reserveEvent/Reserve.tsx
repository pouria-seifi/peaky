import React, { useState } from "react";
import Layout from "../../layout/Layout";
import { Calendar } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { TimeCircle } from "react-iconly";
import { toEnglishNumber, toFarsiNumber, typeOfEvent } from "../functions";
import ReserveHourModal from "./ReserveHourModal";
import UserInformation from "./UserInformation";
import { useRouter } from "next/router";

const Reserve = ({ eventData = {} }) => {
    const router = useRouter()
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const [showReserveHourModal, setShowReserveHourModal] = useState(false);
    const [showCalendar, setShowCalendar] = useState(true);

    const {
        title = "",
        duration = "",
        type = "",
        description = "",
        className = "",
        freeTimes = "",
        status = true
    } = eventData

    const date = new Date()
    const jalaliDate = date.toLocaleDateString("fa").split("/")
    const minimumDate = {
        year: +toEnglishNumber(jalaliDate[0]),
        month: +toEnglishNumber(jalaliDate[1]),
        day: +toEnglishNumber(jalaliDate[2])
    };


    return (
        <Layout
            bodyIdStyle="Reserve"
            sideBar={false}
        >
            {
                Object.keys(eventData).length ?
                    status ?
                        <div className={className}>
                            <div className="wrapper">
                                <div>
                                    <div>
                                        <h4>
                                            {title}
                                        </h4>
                                    </div>

                                    <div className="body">
                                        <div className="duration">
                                            <TimeCircle />
                                            <span>
                                                {toFarsiNumber(duration || "-")}
                                            </span>
                                        </div>

                                        <span className="type">
                                            {typeOfEvent(type)}
                                        </span>
                                    </div>

                                    <div className="description">
                                        {description}
                                    </div>
                                </div>
                                <div className="calendar">
                                    {
                                        showCalendar ?
                                            <Calendar
                                                value={selectedDay}
                                                onChange={e => {
                                                    router.query.selectedDay = e
                                                    setSelectedDay(e)
                                                    setShowReserveHourModal(o => !o)
                                                }}
                                                minimumDate={minimumDate}
                                                locale="fa"
                                                calendarClassName="custom-calendar"
                                                shouldHighlightWeekends
                                            />
                                            :
                                            <UserInformation
                                                selectedDay={selectedDay}
                                                selectedHour={selectedHour}
                                            />
                                    }
                                </div>
                            </div>
                            <ReserveHourModal
                                show={showReserveHourModal}
                                setShow={setShowReserveHourModal}
                                freeTimes={freeTimes}
                                selectedDay={selectedDay}
                                className={className}
                                setShowCalendar={setShowCalendar}
                                selectedHour={selectedHour}
                                setSelectedHour={setSelectedHour}
                            />
                        </div>
                        :
                        <div className="unactiveEvent">
                            <h3>
                                رویداد غیر فعال شده است
                            </h3>
                        </div>
                    :
                    <div className="unactiveEvent">
                        <h3>
                            رویدادی با این مشخصات یافت نشد!
                        </h3>
                    </div>
            }

        </Layout>
    )
}

export default Reserve;