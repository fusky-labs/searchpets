// import { Client, Entity, Schema, Repository } from "redis-om"

// const client = new Client()

// async function connect() {
//   if (!client.isOpen()) {
//     await client.open(process.env.REDIS_URL)
//   }
// }

// class Comic extends Entity {}

// let schema = new Schema(Comic, {
//   title: { type: "string" },
//   comic_link: { type: "string" },
//   characters: { type: "string[]" },
//   image: { type: "string" },
//   index: { type: "number", sortable: true }
// })

// export async function searchComics<RedisClient>(years: string[], characters: string[]) {
//   await connect()
//   // for every year index given, search that year index that have the characters given
//   let comics: RedisClient[] = []
//   console.log(years)
//   console.log(characters)

//   years.forEach((year) => {
//     console.log(year)
//     // search the index for the year for comics that have the characters given
//     // once found, add them to the comics array
//   })
//   return { comics: comics }
// }

export {}
