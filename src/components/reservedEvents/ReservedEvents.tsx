import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { typeOfEvent } from '../functions';

const ReservedEvents = ({ data }) => {
    const [reservedEvents, setReservedEvents] = useState(data)

    useEffect(() => {
        const tableData = data.map(({ _id, title, date, username, userEmail, type, hour }) => {
            return {
                key: _id,
                title,
                "date": hour + " - " + date,
                username,
                userEmail,
                "type": <span id={type} className="type">
                    {typeOfEvent(type)}
                </span>
            }
        })
        setReservedEvents(tableData.reverse())
    }, [data])



    const columns = [
        {
            title: 'ردیف',
            dataIndex: 'key',
            render: (__, _, index) => (
                <div size="middle">
                    <p>{index + 1}</p>
                </div>
            ),
        },
        {
            title: 'رویداد',
            dataIndex: 'title',
        },
        {
            title: 'تاریخ',
            dataIndex: 'date',
        },
        {
            title: 'مهمان',
            dataIndex: 'username',
        },
        {
            title: 'تلفن/ایمیل',
            dataIndex: 'userEmail',
        },
        {
            title: 'محل رویداد',
            dataIndex: 'type',
        },
    ];

    return (
        <Layout
            sideBar={true}
            bodyIdStyle="ReservedEvents"
        >
            {
                reservedEvents.length ?
                    <React.Fragment>
                        {
                            reservedEvents.map(({ key, date, title, type, userEmail, username }) => (
                                <div
                                    className='reservedEventsMobile'
                                    key={key}
                                >
                                    <div>
                                        <span className='key'>رویداد</span>
                                        <span className='value'>{title}</span>
                                    </div>

                                    <div>
                                        <span className='key'>تاریخ</span>
                                        <span className='value'>{date}</span>
                                    </div>

                                    <div>
                                        <span className='key'>مهمان</span>
                                        <span className='value'>{username}</span>
                                    </div>

                                    <div>
                                        <span className='key'>تلفن/ایمیل</span>
                                        <span className='value'>{userEmail}</span>
                                    </div>

                                    <div>
                                        <span className='key'>محل رویداد</span>
                                        <span className='value'>{type}</span>
                                    </div>

                                </div>
                            ))
                        }
                        <Table
                            columns={columns}
                            dataSource={reservedEvents}
                            pagination={false}
                            className="reservedEventsTable"
                            size="middle"
                        />
                    </React.Fragment>
                    :
                    <span>رویداد هماهنگ شده ای یافت نشد</span>
            }


        </Layout>
    )
}

export default ReservedEvents