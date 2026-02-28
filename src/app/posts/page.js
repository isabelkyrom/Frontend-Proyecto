'use client'
import { useState, useEffect } from "react";
import { getPosts } from "../utils/apiExterna/getPosts";
import { getComments } from "../utils/apiExterna/getComments";
import Link from "next/link";
import Popup from "reactjs-popup";


export default function CommentsPage() {

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [openPopup, setOpenPopout] = useState(false);

    async function dataPosts() {
        try {
            const data = await getPosts();
            setPosts(data);
        } catch (err) {
            console.error("Error al obtener tareas:", err);
        }
    }

    async function mostrarPopup(post) {
        setSelectedPost(post);
        setOpenPopout(true);
        try {
            const data = await getComments(post.id);
            setComments(data);
        } catch (err) {
            console.error("Error al obtener comentarios:", err);
        }
    }

    useEffect(() => {
        dataPosts();
    }, []);
    

    return(
        <div className="bg-gray-100 min-h-screen p-6">
            <div>
                <div>
                    <h1 className="text-3xl text-indigo-900 font-semibold text-center mb-4">Posts</h1>
                     
                     <div>
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {posts.map((post) => (
                                <li key={post.id}
                                className='flex flex-col justify-between
                                border border-gray-300 bg-white shadow rounded-lg
                                py-3 px-3
                                text-gray-600'>
                                    <span className="font-semibold">{post.title}</span> 
                                    {post.body}
                                    <button 
                                    className="mt-2 text-indigo-900 hover:underline"
                                    onClick={() => mostrarPopup(post)}
                                    >Más detalles</button>
                                </li>
                            ))}
                        </ul>

                        {openPopup && selectedPost && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-40">
                                <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl relative">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold mb-4">{selectedPost.title}</h2>
                                        <button 
                                        className=" text-indigo-900 font-bold px-3 py-2"
                                        onClick={() => setOpenPopout(false)}
                                        >x</button>
                                    </div>
                                    
                                    <p className="mb-4">{selectedPost.body}</p>
                                    <h3 className="font-semibold mb-2">Comentarios:</h3>
                                    <ul className="max-h-80 overflow-y-auto">
                                        {comments.map((comment) => (
                                            <li key={comment.id} className="border border-gray-300 mb-3 rounded-lg p-2">
                                                <span className="font-semibold">{comment.name}:</span> {comment.body}
                                            </li>
                                        ))}
                                    </ul>
                                    
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}