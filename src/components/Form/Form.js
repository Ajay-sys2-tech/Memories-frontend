import React, {useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Container } from '@material-ui/core';
import FileBase  from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData ] = useState({
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    })

    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
      if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
      e.preventDefault();

      if(currentId){
        dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}, navigate));
      }else{
        dispatch(createPost({ ...postData, name: user?.result?.name}, navigate));
      }
  
      clear();
    }

    const clear = () => {
      setCurrentId(null);
      setPostData({ title: '', message: '', tags: '', selectedFile: '' })
    }

    if(!user?.result?.name){
      return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography variant="h6" align="center">Please sign in to create a new Post!</Typography>
        </Paper>
        </Container>
      )
    }
  return (
    <Container component="main" maxWidth="xs">
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId ? 'Editing' : 'Creating' } a memory</Typography>
        <TextField name='title' variant='outlined' label='title' fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})} />
        <TextField name='message' variant='outlined' label='message' fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})} />
        <TextField name='tags' variant='outlined' label='tags' fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})} />
        </div>
        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='sumbit' fullWidth>{currentId ? 'Update' : 'Submit'}</Button>
        <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
    </Container>
  )
}

export default Form;
