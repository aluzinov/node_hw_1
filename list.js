// Написать функцию для показа древовидной структуры.

const data = [{ 
  "name": 1, 
  "items": [
    { "name": 2, 
      "items": [{ "name": 3 }, { "name": 4 }] 
    }, 
    { "name": 5, 
      "items": [{ "name": 6 }] 
    }
  ] 
}]

const data1 = [
  { name: 1, 
    items: [
      { name: 1.1,
        items: [
          { name: '1.1.1' },
          { name: '1.1.2' }
        ], },
      { name: 1.2, 
        items: [
          { name: '1.2.1' },
          { name: '1.2.2' }
        ],
      }
    ],
  }, 
  { name: 2,
  }
]

function listItems(list, depth, prefix) {
  list.forEach((item, index) => {
    const is_last = list.length - 1 == index
    const path = is_last ? "└" : "├"
    console.log(prefix, path, item.name)

    if (item.items) {
      const new_prefix = is_last ? " ": " │"
      listItems(item.items, depth + 1, prefix + new_prefix)
    }
  })
}

listItems(data, 0, "")