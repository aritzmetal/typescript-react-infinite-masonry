import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Masonry from "../src/index"

type Props = Parameters<typeof Masonry>[0]

describe("Masonry", () => {
    let wrapper: { baseElement: Element | Element[] }

    beforeEach(() => {
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        })
    })

    const props: Props = {
        next: () => null,
        loader: null,
        hasMore: true,
        dataLength: 3,
        children: [1, 2, 3],
    }

    const mountWrapper = (extraProps?: Partial<Props>) => {
        if (extraProps) {
            wrapper = render(<Masonry {...props} {...extraProps} />)
        } else {
            wrapper = render(<Masonry {...props} />)
        }
    }
    test("Should match snapshot", () => {
        mountWrapper()

        expect(wrapper.baseElement).toMatchSnapshot("basic")
    })
})
