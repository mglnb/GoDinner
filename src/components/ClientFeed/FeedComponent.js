import React from "react";
import { Feed, Icon } from 'semantic-ui-react'
const FeedComponent = ({post}) => (
  <Feed.Event>
    <Feed.Label image={post.restaurant.avatar_url} />
    <Feed.Content>
      <Feed.Summary>
        <a>{post.restaurant.name}</a> adicionou um novo post 
        <Feed.Date>{timeSince(post.created_at)} atrás</Feed.Date>
      </Feed.Summary>
      <Feed.Extra images>
        <a>
          <img src={post.image_url} />
        </a>
      </Feed.Extra>
      {/* <Feed.Meta>
        <Feed.Like>
          <Icon name='like' />
          {post.likes} Like
        </Feed.Like>
      </Feed.Meta> */}
    </Feed.Content>
  </Feed.Event>
)

export default FeedComponent


function timeSince(date) {
  date = new Date(date)
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " anos";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " meses";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " dias";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " horas";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutos";
  }
  return Math.floor(seconds) + " segundos";
}