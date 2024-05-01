import React, { useEffect, useState } from "react";
import {Container, PostCard} from "../Components"
import { DBService } from "../Appwrite/config_appwrite";

function AllPost(){
    const [posts,setPosts]=useState[[]]

    useEffect(()=>{
        DBService.getPosts([]).then((post)=>{
            if(post){
                setPosts(post.documents)
            }
        })
    })
    return (
        <div>
            <Container>

                <div className="flex flex-wrap ">
                    {posts.map((post)=>(
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard post={post}/>
                        </div>
                    ))}
                 </div>
            </Container>
        </div>
    )
}
export default AllPost