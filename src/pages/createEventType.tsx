import Layout from "../layout/Layout";
import React from "react";
import type { NextPage } from "next";
import CreateEventType from "../components/createEventType/CreateEditEventType";


const CreateEventTypePage: NextPage = () => {
    return (
        <Layout
            sideBar={true}
        >
            <CreateEventType
                title={"ایجاد نوع رویداد جدید"}
            />
        </Layout>
    );
}

export default CreateEventTypePage;
