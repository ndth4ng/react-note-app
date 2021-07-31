import { createContext, useReducer } from "react";
import {postReducer} from "../reducers/postReducer";
import { apiUrl } from "./constants";
import axios from "axios";
import { POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS } from "../reducers/types";

export const PostContext = createContext();

const PostContextProvider = ({children}) => {
    //State
    const [postState, dispatch] = useReducer(postReducer, {
        posts: [],
        postsLoading: true
    });

    // Get all posts
    const getPosts = async() => {
        try {
            const response = await axios.get(`${apiUrl}/posts`);
            if (response.data.success) 
                dispatch({
                    type: POSTS_LOADED_SUCCESS,
                    payload: response.data.posts
                });
        } catch (error) {
            dispatch({type: POSTS_LOADED_FAIL});
        }
    }

    // Context data
    const postContextData = {
        postState,
        getPosts
    }
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    );
}

export default PostContextProvider;