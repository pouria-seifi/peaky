import React from 'react'
import type { NextPage } from 'next'
import ReservedEvents from '../components/reservedEvents/ReservedEvents'
import Cookies from 'universal-cookie';
import { apiGetReservedEvents } from '../apis/apiReserveEvent';

const ReservedEventsPage: NextPage<{ data: any }> = ({ data }) => {
    return (
        <ReservedEvents
            data={data.data}
        />
    );
}

export async function getServerSideProps({ req = {} }) {
    const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();

    const token = cookies.get("peakyToken")
    const data = await apiGetReservedEvents({ token })
        .then((result) => ({
            ...result
        }))
        .catch((err) => ({
            data: null
        }))

    return {
        props: {
            data
        },
    }
}

export default ReservedEventsPage
