import React, { useState } from 'react';
import { Card, CardActions, CardContent, Button, Typography, CardMedia, ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from  '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from  '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from  '@material-ui/icons/Delete';
import MoreHorizIcon from  '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const [ likes, setLikes ] = useState(post?.likes);
    const userId = user?.result?.googleId || user?.result?._id;
    const hasLiked = post.likes.find((like) => like === userId);

    const handleLike = async () =>{
       dispatch(likePost(post._id));

       if(hasLiked){
        setLikes(post.likes.filter((id) =>  id !== userId))
       }
       else{
        setLikes([...likes, userId]);
       }
    }

    const Likes = () => {
      if (likes.length > 0) {
        return likes.find((like) => like === userId)
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
  
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => navigate(`/posts/${post._id}`)

  return (
    <Card className={classes.card} raised elevation={6}>
    <ButtonBase className={classes.cardAction} onClick={openPost}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post.creator) && (
          <Button style={{color: "white"}} size='small' onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize='default' />
          </Button>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag.trim()} `)}</Typography>
      </div>
      <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography  variant='body2' color='textSecondary' component='p' noWrap={true}>{post.message}</Typography>
      </CardContent>
    </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
            <Likes />
        </Button>

        {(user?.result?.googleId === post.creator || user?.result?._id === post.creator) && (
          <Button size='small' color='secondary' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small'/>
              Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post;