import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { createClient } from '@supabase/supabase-js'


const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

export const server = {
    register: defineAction({
        accept: 'form',
        input: z.object({
            familyName: z.string(),
            emailAddress: z.string().email(),
            privacyStatement: z.boolean()
        }),

        handler: async (formData) => {
            console.log("inside handler")
            console.log("formData:" + formData)
            const { data, error } = await supabase
                .from('AddressBook')
                .insert([
                    {
                        email_address: formData.emailAddress,
                        family_name:formData.familyName,
                        privacy_statement: formData.privacyStatement
                    },
                ])
                .select()

            if (error) {
                console.error(error)

            }
            if (data) {
                console.log(data)
            }
        },
    })
}