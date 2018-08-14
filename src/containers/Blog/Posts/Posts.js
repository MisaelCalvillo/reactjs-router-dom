import React, { Component } from 'react';
import axios from './../../../axios';
import { Route } from 'react-router-dom';

import './Posts.css';
import Post from './../../../components/Post/Post';
import FullPost from './../FullPost/FullPost';

class Posts extends Component {
  
  state = {
    posts: [],
  }

  componentDidMount() {
    axios.get('/posts')
         .then(response => {
             const posts = response.data.slice(0, 4);
             const updatedPost = posts.map(post => {
                 return {
                     ...post,
                     author: 'Max'
                 }
             })
             this.setState({ posts: updatedPost })
         })
         .catch(error => {
            console.log(error);
            //  this.setState({ error: true });
         });
}

  postSelectedHandler = (id) => {
    this.props.history.push({pathname: '/posts/' + id})
  }

  render () {
    // console.log(this.props);
    let posts = <p style={{textAlign: 'center'}}>Something went Wrong :(</p>;

      if (!this.state.error) {
          posts = this.state.posts.map(post => {
              return ( 
                  // <Link to={'/' + post.id} key={post.id} >
                    <Post 
                        key={post.id}
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}/>
                  // </Link> 
              );
          });
      }

    return (
      <div>
        <section className="Posts">
            {posts}
        </section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
