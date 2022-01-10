## About

A simple Masonry component that works out of the box. It is based on: - [Bricks.js](https://github.com/callmecavs/bricks.js) - [react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component)

Its use is intended for not so large amounts of elements on screen.

### Instalation

Using --> `npm`

```sh
  npm install --save typescript-react-infinite-masonry
```

Using --> `yarn`

```sh
  yarn add typescript-react-infinite-masonry
```

  ### Example

```tsx
import Masonry from 'react-masonry-infinite';

...
<MasonryInfiniteScroll
          dataLength={elements.length}
          hasMore={true}
          loader={<LoaderComponent />}
          next={loadMore}
        >
          {elements.map(({ key }) => (
            <div
              key={key}
            />
          ))}
        </MasonryInfiniteScroll>
...
```

### Props

|   Props   |  Type   | Default                       | Description                                                                                                            |
| :-------: | :-----: | :---------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| className | String  | `''`                          | className for root node styles                                                                                         |
|   pack    | Boolean | `false`                       | If it is true uses pack instead of update function on every update                                                     |
|  packed   | String  | `datum--packed`               | Attribute added to the items after they are positioned. Detailed: [Bricks.js](https://github.com/callmecavs/bricks.js) |
|   sizes   |  Array  | `[{ columns: 1, gutter: 16 }, { mq: "768px", columns: 2, gutter: 16 }, { mq: "1024px", columns: 3, gutter: 16 }, { mq: "1200px", columns: 4, gutter: 16 },]`| 
Grid properties for every media breakpoint. See [Bricks.js](https://github.com/callmecavs/bricks.js) | | position | Boolean | `true` | A Boolean indicating that the grid items should be positioned using the`top`and`left`CSS props. | | style | Object | `{}` | The inline extra style |

It inherits props from [react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component).
