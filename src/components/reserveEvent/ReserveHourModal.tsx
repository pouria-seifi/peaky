import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import moment from "jalali-moment"
import { useRouter } from 'next/router';

function ReserveHourModal({
    show,
    setShow,
    freeTimes,
    selectedDay,
    className,
    setShowCalendar,
    selectedHour,
    setSelectedHour
}) {
    const router = useRouter()
    const [dayFreeTime, setDayFreeTime] = useState([]);

    useEffect(() => {
        if (!selectedDay || !freeTimes) return
        const dayName = moment
            .from(selectedDay.year + "/" + selectedDay.month + "/" + selectedDay.day, 'fa', 'YYYY/MM/DD')
            .format('dddd')
            .slice(0, 3)
            .toLowerCase()

        setDayFreeTime(freeTimes[dayName])
    }, [selectedDay])

    useEffect(() => {
        if (!selectedHour) return
        setShow(false)
        setShowCalendar(false)
    }, [selectedHour])

    return (
        <Modal
            title={
                <span>
                    انتخاب زمان رویداد
                </span>
            }
            className='ReserveHourModal'
            visible={show}
            onCancel={() => setShow(o => !o)}
            footer={null}
        >
            <div className={`${className} reserveHours`}>
                {
                    (dayFreeTime || []).length ?
                        (dayFreeTime || []).map(hour => {
                            return <button
                                className='hour'
                                value={hour}
                                onClick={e => {
                                    setSelectedHour(e.target.value)
                                    router.query.selectedHour = e.target.value
                                }}
                            >
                                {hour}
                            </button>
                        })
                        :
                        <h5>
                            ساعتی برای برگزاری جلسه یافت نشد
                        </h5>
                }
            </div>
        </Modal >
    );
}

export default ReserveHourModal;