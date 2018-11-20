import React from 'react'
import {Card, Feed, Rating} from 'semantic-ui-react'

class Stars extends React.Component {
  Star = () => {
    if (this.props.restaurant.orders.length === 0) return <span>Nenhuma avaliação</span>

    return this.props.restaurant.orders.map((rating, index) => (
      <Feed.Event key={index}>
        <Feed.Label image={rating.client.avatar_url} />
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{rating.client.name}</Feed.User> avaliou seu restaurante.
          <Feed.Date content={'1 dia atras'} />
          </Feed.Summary>
          <Feed.Extra >
            Pediu: {rating.menu_options.map((value, index) => `${value.name}${rating.menu_options.length >= index + 2 ? ', ' : ''} `)}
          </Feed.Extra>
          <Feed.Meta>
            <Rating icon='star' defaultRating={rating.star} maxRating={5} disabled size={"tiny"} />
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    ))
  }
  render () {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            Stars
          </Card.Header>
        </Card.Content>
        <Card.Content style={{height: '450px'}}>
          <Feed>
            {this.Star()}
          </Feed>
        </Card.Content>
      </Card>

    )
  }
}

export default Stars
