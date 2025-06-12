import React from 'react'
import type { NextPage } from 'next'
import Layout from '../layout/Layout'

const SuccesfullyReservedEvent: NextPage = () => {
    return (
        <Layout
            bodyIdStyle="succesfullyReservedEvent"
            sideBar={false}
        >
            <div className="wrapper">
                <h3>رویداد با موفقیت هماهنگ شد</h3>
            </div>
        </Layout>
    )
}

export default SuccesfullyReservedEvent
