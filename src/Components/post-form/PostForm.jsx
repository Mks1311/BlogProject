import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import DBservice from "../../Appwrite/config_appwrite";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm(post) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.user.userData)

    const submit = async (data) => {
        // img or image dekhna hai

        if (post) {
            const file = data.image[0] ? DBservice.uploadFile(data.img[0]) : null

            if (file) {
                DBservice.deleteFile(post.img)
            }

            const dbPost = await DBservice.updatePost(post.$id, {
                ...data, img: file ? file.$id : undefined
            })

            if (dbPost) {
                navigate(`/post${dbPost.$id}`)
            }
        }
        else {
            const file= await DBservice.uploadFile(data.image[0])

            if(file){
                const fileId=file.$id
                data.img=fileId
                const dbPost=await DBservice.createPost({...data,userId:userData.$id})
                if(dbPost){
                    navigate(`/post${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform=useCallback((value)=>{
        if(value && typeof value==="string"){
            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d\s]+/g,'-')
                .replace(/\s/g,'-')
        }else{ 
            return ""
        }
    },[])

    return (
        <>
        </>
    )
}

export default PostForm