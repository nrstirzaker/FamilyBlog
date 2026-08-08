import {pgTable as table} from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const posts = table(
    "posts",
    {
        id: t.uuid().primaryKey().defaultRandom(),
        title: t.varchar({length: 100}),
        post: t.varchar({length: 2000}),
        likes: t.integer(),
        object_key: t.varchar(),
        file_url: t.varchar(),
        created_on: t.timestamp().defaultNow(),
    }
);