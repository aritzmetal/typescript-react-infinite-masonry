import React, { CSSProperties, useEffect, useRef, useState } from "react"
import Bricks from "bricks.js"
import type { SizeDetail, Instance } from "bricks.js"
import InfiniteScroll, { Props as InfiniteScrollProps } from "react-infinite-scroll-component"

export interface Props extends InfiniteScrollProps {
    /** Classname to pass down styles */
    className?: string
    /** Update all options or just the new ones
     * @default false
     */
    pack?: boolean
    /** An attribute added to the grid items after they're positioned within the grid. */
    packed?: string
    /** A boolean, defaulting to true, indicating that the grid items should be positioned using the top and left CSS properties. */
    position?: boolean
    /** Media query and viewport breakpoints */
    sizes?: SizeDetail[]
    /** Custom */
    style?: CSSProperties
    /** Children of the masonry */
    children: React.ReactNode | JSX.Element
}

const defaultSizes: SizeDetail[] = [
    { columns: 1, gutter: 16 },
    { mq: "768px", columns: 2, gutter: 16 },
    { mq: "1024px", columns: 3, gutter: 16 },
    { mq: "1200px", columns: 4, gutter: 16 },
]

export const MasonryInfiniteScroller = ({
    className = "",
    pack = false,
    packed = className ? `${className}--packed` : `datum--packed`,
    position = true,
    sizes = defaultSizes,
    style = {},
    children,
    ...extraProps
}: Props) => {
    const ref = useRef<HTMLDivElement>(null)
    const [instance, setInstance] = useState<Instance>()

    useEffect(() => {
        if (ref.current) {
            setInstance(
                Bricks({
                    container: ref.current,
                    packed,
                    sizes,
                    position,
                })
            )
        }
    }, [ref.current])

    useEffect(() => {
        if (!!instance) {
            instance.pack()
            instance.resize(true)
        }
    }, [instance])

    useEffect(() => {
        if (instance) {
            if ((children as React.ReactNode[]).length > 0) {
                if (pack) {
                    instance.pack()
                } else {
                    instance.update()
                }
            }
        }
    }, [(children as React.ReactNode[]).length])

    return (
        <InfiniteScroll {...extraProps}>
            <div ref={ref} className={className} style={style}>
                {children}
            </div>
        </InfiniteScroll>
    )
}
