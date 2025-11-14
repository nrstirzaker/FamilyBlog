export const prerender = false
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
            yourFamilyName: z.string().max(50),
            emailAddress: z.string().email().max(50)
        }),

        handler: async (formData) => {

            const insertSQL = "INSERT INTO address_book(family_name,email_address) VALUES($1,$2) RETURNING *";
            const values  = [formData.yourFamilyName,formData.emailAddress]


            const client = await pool.connect();
            try {
                const res = await client.query(insertSQL, values);

                // TODO remove the above but add logging
                // TODO redirect to thankyou page
                // TODO send email confirming registration
            } finally {
                client.release();
            }
            console.log("navigate")

            return