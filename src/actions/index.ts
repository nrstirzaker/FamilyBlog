import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { createClient } from '@supabase/supabase-js'


const supabase = createClient(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_KEY)

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
            console.log(import.meta.env.SUPABASE_URL)
            console.log(import.meta.env.SUPABASE_KEY)
            // const { data, error } = await supabase
            //     .from('AddressBook')
            //     .insert([
            //         {
            //             email_address: formData.emailAddress,
            //             family_name:formData.familyName
            //
            //         },
            //     ])

            const { data, error } = await supabase
                .from("public.address_book")
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