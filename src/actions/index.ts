import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Pool } from 'pg';
const pool = new Pool({
    connectionString: import.meta.env.DATABASE_URL,
    ssl: true,
});




export const server = {
    register: defineAction({
        accept: 'form',
        input: z.object({
            familyName: z.string(),
            emailAddress: z.string().email(),
            privacyStatement: z.coerce.boolean()
        }),

        handler: async (formData) => {
            const yesPrivacy: boolean = true;
            console.log("inside handler")
            console.log("formData:email:" + formData.emailAddress)
            console.log("formData:familyname:" + formData.familyName)
            console.log("formData:privacy:" + formData.privacyStatement)

            const insertSQL = "INSERT INTO address_book(family_name,email_address,privacy_statement) VALUES($1,$2,$3) RETURNING *";
            const values  = [formData.familyName,formData.emailAddress,formData.privacyStatement]


            const client = await pool.connect();
            try {
                const res = await client.query(insertSQL, values);
                console.log(res.rows[0])
            } finally {
                client.release();
            }





        },
    })
}