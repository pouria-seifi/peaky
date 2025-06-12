import React from "react";
import type { NextPage } from "next";
import { apiGetAllEventTypes } from "../apis/apiEventType";
import EventTypes from "../components/eventTypes/EventTypes";
import Cookies from 'universal-cookie';

const EventTypesPage: NextPage<{ data: any }> = ({ data }) => {
    return (
        <EventTypes
            data={data.eventTypes}
        />
    );
}

export async function getServerSideProps({ req = {} }) {
    const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();

    const token = cookies.get("peakyToken")
    const data = await apiGetAllEventTypes({ token })
        .then((result) => ({
            ...result
        }))
        .catch((err) => ({
            eventTypes: null
        }))

    return {
        props: {
            data
        },
    }
}

export default EventTypesPage;
