import React from 'react'
import {Card, Image, Icon, Button} from 'semantic-ui-react'
class RestaurantPosts extends React.Component {
  render () {
    return (
      <div className="restaurant_posts">
        <div className="restaurant_posts__header">
          <h1>Postagens</h1>
          <Button basic circular className="restaurant_posts__addbutton" animated color='blue'>
            <Button.Content hidden>Novo</Button.Content>
            <Button.Content visible>
              <Icon name='plus' />
            </Button.Content>
          </Button>
        </div>
        <Card.Group itemsPerRow={3}>
          {Array.from(new Array(10)).map((_, index) => (

            <Card link href={`#/restaurant/posts/${index}`} key={index}>
              <Image src='https://lorempixel.com/1024/600/business/?11856' />
              <Card.Content>
                <Card.Header>Como coisar tais coisas</Card.Header>
                <Card.Meta>Miguel Boanova</Card.Meta>
                <Card.Description>Coisar as coisas acaba sendo mais facil que coisar coisas que não formam coisas...</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  10 pessoas gostaram
              </a>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    )
  }
}

export default RestaurantPosts