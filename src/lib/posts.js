import {supabase} from "./supabase.ts";


export const getPosts = async function () {
    console.log("Getting posts");
    let {data, error} = await supabase.from("Family-BlogPosts").select();

    // if (error) {
    //     const message = {"error": error.message};
    //     console.log(message);
    // } else {
        error = {msg: "a"}
    //}

    if (!data) {
        data = []
    }

    return {'data': data, "error": error}
}