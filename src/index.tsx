import React, { useEffect, useRef, useState } from "react"
import Bricks from "bricks.js"
import type { SizeDetail, Instance } from "bricks.js"
import InfiniteScrollComponent from "react-infinite-scroll-component"
import { Props as InfiniteScrollProps } from "react-infinite-scroll-component"
import { CSSProperties } from "react"

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
    /** Callback invoked when the content is loaded */
    onLoaded?: () => void
    /** Custom styles */
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

export const Masonry = ({
    className = "infinite-scroll",
    pack = false,
    packed = `datum-packed`,
    position = true,
    sizes = defaultSizes,
    onLoaded,
    style = {},
    children,
    ...extraProps
}: Props): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null)
    const [instance, setInstance] = useState<Instance>()

    const loadMore = () => {
        extraProps.next && extraProps.next()
        onLoaded && onLoaded()
    }

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
        <div className={`${className}-root`} style={{ overflow: "auto" }}>
            <InfiniteScrollComponent {...extraProps} next={loadMore}>
                <div ref={ref} className={className} style={style}>
                    {children}
                </div>
            </InfiniteScrollComponent>
        </div>
    )
}

export default Masonry
