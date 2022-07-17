import React , {useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import {useDispatch , useSelector } from 'react-redux'
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

import { fetchPosts , fetchTags} from '../redux/slices/posts';


export const Home = () => {
  const dispatch = useDispatch() ; 
  const userData  = useSelector(state => state.auth.data) ;
  const  {posts, tags } = useSelector(state => state.posts); 


  const isPostsLoading = posts.status === 'loading' ;
  const isTagsLoading = tags.status === 'loading' ;

  const defaultImage = 'https://cdn.pellerex.com/public/ecosystem/web/content/identity/react-identity-check/react-redux.png';
  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
  
    dispatch(fetchPosts()) ;
    dispatch(fetchTags())
   
  }, [dispatch])
  
console.log(posts);
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(  isPostsLoading ?  [...Array(5)] : posts.items).map((obj , index) => 
          
          isPostsLoading ? ( <Post key={index} isLoading={true} /> ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl ={ obj.imageUrl ? baseURL+obj.imageUrl : defaultImage }
              user={{
                avatarUrl:obj.user.avatarUrl ,
                fullName : obj.user.fullName
              }}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={[...obj.tags]}
              isEditable={userData?._id === obj.user._id}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: ' Vasya ',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Some big comment ',
              },
              {
                user: {
                  fullName: 'Rock ivanov',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
