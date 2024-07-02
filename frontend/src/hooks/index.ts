import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog {
    title: string
    content: string;
    id: number;
    publishedDate: string;
    author: {
        name: string;
    }
}


export const useBlogs = () => {
    const [loading, setLoading] = useState(true);

    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((response) => {
            setBlogs(response.data.allPosts);
            setLoading(false)
        }).catch(e => {
            console.log("API ERROR WHILE FETCHING BLOGS", e)
        })
    }, [])

    return {
        loading,
        blogs
    }
}


export const useBlog = ({ id }: { id: number }) => {
    const [loading, setLoading] = useState(true);

    const [post, setPost] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((response) => {
            setPost(response.data.post);
            setLoading(false)
        }).catch(e => {
            console.log("API ERROR WHILE FETCHING A SINGLE BLog", e)
        })
    }, [])

    return {
        loading,
        post
    }
}