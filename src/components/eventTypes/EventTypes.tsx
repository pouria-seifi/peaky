import React, { useState } from "react";
import Layout from "../../layout/Layout";
import EventType from "./EventType";
import Empty from "../empty/Empty";
import CreateEditEventType from "../createEventType/CreateEditEventType";

import type { EventTypeData } from "./EventType";

interface EventTypesProps {
    data: EventTypeData[];
}

const EventTypes = ({ data }: EventTypesProps) => {
    const [eventTypes, setEventTypes] = useState(data);
    const [EditEventType, setEditEventType] = useState(false)


    return (
        <Layout
            bodyIdStyle="EventTypes"
            sideBar={true}
        >
            {
                EditEventType &&
                <CreateEditEventType
                    title='ویرایش نوع رویداد'
                    backButton={() => setEditEventType(null)}
                    EditEventType={EditEventType}
                />
            }
            <div
                className={`eventTypes ${Object.keys(EditEventType || []).length ? "d-none" : ""}`}
            >
                {
                    eventTypes?.length ?
                        eventTypes.map(eventType => (
                            <EventType
                                key={eventType._id}
                                data={eventType}
                                setEventTypes={setEventTypes}
                                setEditEventType={setEditEventType}
                            />
                        ))
                        : <Empty />
                }
            </div>
        </Layout>
    );
}

export default EventTypes;