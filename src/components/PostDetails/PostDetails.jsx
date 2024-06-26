import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Card, CardMedia, ButtonBase, Button, CardContent} from '@material-ui/core';
import {  useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import useStyles from './styles';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if(post){
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags?.join(',')}))
    }
  }, [post])

  if(!post) return null;

  if(isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress  size="7em"/>
      </Paper>
    )
  }

  const recommendedPosts = posts.filter(({_id}) => post._id !== _id);

  const openPost = (_id) => navigate(`/posts/${_id}`)

  const Post = (post) => {
    return (
      <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
      </div>
     
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag.trim()} `)}</Typography>
      </div>
      <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography  variant='body2' color='textSecondary' component='p' noWrap={true}>{post.message}</Typography>
      </CardContent>
    </ButtonBase>
    </Card>
    )
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
    <div className={classes.card}>
      <div className={classes.section}>
        <Typography variant="h3" component="h2">{post.title}</Typography>
        <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
        <Typography variant="h6">Created by: {post.name}</Typography>
        <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
        <Divider style={{ margin: '20px 0' }} />
        <CommentSection post={post} />
        <Divider style={{ margin: '20px 0' }} />
      </div>
      
      <div className={classes.imageSection}>
        <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
      </div>
    </div>
    <Button variant='contained' color='primary' onClick={() => navigate(-1)} >Back</Button>
    {recommendedPosts.length ? (
      <div className={classes.section}>
        <Typography gutterBottom variant='h5'>You might also like:</Typography>
        <Divider />
        <div className={classes.recommendedPosts}>
          { recommendedPosts.map(({ title, message, name, likes, selectedFile, _id}) => {
            return (<div style={{margin: '20px', cursor: 'pointer'}} onClick={() => openPost(_id)} key={_id}>
              <Typography gutterBottom variant='h6' >{title}</Typography>
              <Typography gutterBottom variant='subtitle2'>{name}</Typography>
              <Typography gutterBottom variant='subtitle2'>{message}</Typography>
              <Typography gutterBottom variant='subtitle1'>Likes: {likes.length}</Typography>
              <img src={selectedFile} width='200px' alt={`${name}`}/>
            </div>)
          })}
        </div>
      </div>
    ) : 
    <Typography gutterBottom variant='h6'>No matching posts found</Typography>}
    </Paper>
  )
}

export default PostDetails;