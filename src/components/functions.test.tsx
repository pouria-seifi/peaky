import React from "react";
import { render, screen } from "@testing-library/react"
import * as functions from "./functions"

describe("funcstions", () => {
    describe("toFarsiNumber", () => {
        test("toFarsiNumber from functions 1234567890 => ۱۲۳۴۵۶۷۸۹۰", () => {
            const farsiNumber = functions.toFarsiNumber("1234567890")
            expect(farsiNumber).toBe("۱۲۳۴۵۶۷۸۹۰")
        })

        test("toFarsiNumber from functions 0987654321 => ۰۹۸۷۶۵۴۳۲۱", () => {
            const farsiNumber = functions.toFarsiNumber("0987654321")
            expect(farsiNumber).toBe("۰۹۸۷۶۵۴۳۲۱")
        })

        test("toFarsiNumber from functions 12:23 => ۱۲:۲۳", () => {
            const farsiNumber = functions.toFarsiNumber("12:23")
            expect(farsiNumber).toBe("۱۲:۲۳")
        })
    })

    describe("toEnglishNumber", () => {
        test("toEnglishNumber from functions ۱۲۳۴۵۶۷۸۹۰ => 1234567890", () => {
            const farsiNumber = functions.toEnglishNumber("۱۲۳۴۵۶۷۸۹۰")
            expect(farsiNumber).toBe("1234567890")
        })

        test("toEnglishNumber from functions ۰۹۸۷۶۵۴۳۲۱ => 0987654321", () => {
            const farsiNumber = functions.toEnglishNumber("۰۹۸۷۶۵۴۳۲۱")
            expect(farsiNumber).toBe("0987654321")
        })

        test("toEnglishNumber from functions ۱۲:۲۳ => 12:23", () => {
            const farsiNumber = functions.toEnglishNumber("۱۲:۲۳")
            expect(farsiNumber).toBe("12:23")
        })
    })



    // describe("Clipboard", () => {
    //     Object.assign(navigator, {
    //         clipboard: {
    //             writeText: () => { },
    //         },
    //     });
    //     jest.spyOn(navigator.clipboard, "writeText");
    //     beforeAll(() => {
    //         functions.copyToClipboard("test")
    //     });
    //     test("should call clipboard.writeText", () => {
    //         expect(navigator.clipboard.writeText).toHaveBeenCalledWith("zxc");
    //     });
    // });

    describe("typeOfEvent", () => {
        test("typeOfEvent should be byPerson", () => {
            render(functions.typeOfEvent("byPerson"))
            const byPerson = screen.getByText('حضوری')
            expect(byPerson).toBeDefined()
        })

        test("typeOfEvent should be phone", () => {
            render(functions.typeOfEvent("phone"))
            const phone = screen.getByText('تلفنی')
            expect(phone).toBeDefined()
        })

        test("typeOfEvent should be skype", () => {
            render(functions.typeOfEvent("skype"))
            const skype = screen.getByAltText('skype')
            expect(skype).toBeDefined()
        })

        test("typeOfEvent should be googleMeet", () => {
            render(functions.typeOfEvent("googleMeet"))
            const googleMeet = screen.getByAltText('google meet')
            expect(googleMeet).toBeDefined()
        })
    })
})
