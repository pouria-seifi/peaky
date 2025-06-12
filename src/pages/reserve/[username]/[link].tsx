import React from "react";
import type { NextPage } from "next";
import { apiGetReserveEventData } from "../../../apis/apiReserveEvent";
import Reserve from "../../../components/reserveEvent/Reserve";
import Cookies from 'universal-cookie';

const ReserveEvent: NextPage<{ data: any }> = ({ data }) => {

    return (
        <Reserve
            eventData={data.data}
        />
    );
}

export async function getServerSideProps({ req = {}, query = {} }) {
    const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();
    const token = cookies.get("peakyToken")

    const { username, link } = query;
    const sendData = {
        username,
        link,
        token,
    }

    const data = await apiGetReserveEventData(sendData)
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

export default ReserveEvent;
