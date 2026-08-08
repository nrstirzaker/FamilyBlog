import * as schema from './src/db/schema.ts'
import { drizzle } from "drizzle-orm/neon-http";
import { seed } from "drizzle-seed";
import * as dotenv from "dotenv"
dotenv.config({ path: ".env" })

async function main() {
    const db = drizzle(process.env.DATABASE_URL as string);
    await seed(db, { posts: schema.posts }).refine((f) => ({
        posts: {
            columns: {
                title: f.string(
                ),
                post: f.loremIpsum({
                    sentencesCount: 10,
                }),
                likes: f.int({
                    minValue: 0,
                    maxValue: 5,
                    isUnique: false,
                })
            },
            count: 20
        }
    }));
}
main();