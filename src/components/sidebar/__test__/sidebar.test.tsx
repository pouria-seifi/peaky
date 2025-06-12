import React from "react";
import { render, screen } from "@testing-library/react"
import Sidebar from "../sidebar"
import { addRouterContext } from "../../__test__/functions";

describe("Sidebar", () => {
    test("should have all routes in sidebar", () => {
        render(addRouterContext(<Sidebar />))

        const reservedEvents = screen.getByText('رویداد های هماهنگ شده')
        expect(reservedEvents).toBeDefined()

        const eventTypes = screen.getByText('رویداد های شما')
        expect(eventTypes).toBeDefined()

        const createEventType = screen.getByText('ایجاد نوع رویداد جدید')
        expect(createEventType).toBeDefined()

        const exit = screen.getByText('خروج')
        expect(exit).toBeDefined()
    })
})
