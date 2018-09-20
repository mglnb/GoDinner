import React from 'react'
import {Button, Form, Card} from 'semantic-ui-react'
import {Mutation} from 'react-apollo';
import {UPDATE_RESTAURANT} from './graphql'


class MyProfile extends React.PureComponent {
    constructor (props) {
        super(props)
        this.state = {
            restaurant: this.props.restaurant
        }
    }
    handleChange = (e) => {
        const name = e.target.name.split('.')
        this.setState({
            restaurant: {
                ...this.state.restaurant,
                [name[0]]: name[1] ? {
                    ...this.state.restaurant[name[0]],
                    [name[1]]: e.target.value
                } : e.target.value
            }
        })
    }
    handleSubmit (e, updateRestaurant) {
        e.preventDefault()
        updateRestaurant({variables: {...this.state.restaurant, email: this.state.restaurant.user.email}})
    }
    render () {
        return (
            <Mutation mutation={UPDATE_RESTAURANT} >
                {(updateRestaurant, {loading, error, called}) => (
                    <Card>
                        <Card.Content>
                            <Card.Header>
                                Meu Perfil
                             </Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Form ref={form => this.form = form} onSubmit={(e) => this.handleSubmit(e, updateRestaurant)} >
                                <Form.Field>
                                    <div className="ui labeled input">
                                        <label htmlFor="name" className="ui label label">Nome do Restaurante: </label>
                                        <input name="name" type="text" onChange={this.handleChange} value={this.state.restaurant.name} />
                                    </div>
                                </Form.Field>
                                <Form.Field>
                                    <div className="ui labeled input">
                                        <label htmlFor="subname" className="ui label label">Slogan: </label>
                                        <input name="subname" onChange={this.handleChange} value={this.state.restaurant.subname} />
                                    </div>
                                </Form.Field>
                                <Form.Field>
                                    <div className="ui labeled input">
                                        <label htmlFor="description" className="ui label label">Descrição: </label>
                                        <textarea name="description" onChange={this.handleChange} value={this.state.restaurant.description} />
                                    </div>
                                </Form.Field>
                                <Form.Field>
                                    <div className="ui labeled input">
                                        <label htmlFor="location" className="ui label label">Endereço: </label>
                                        <input name="location" onChange={this.handleChange} value={this.state.restaurant.location} />
                                    </div>
                                </Form.Field>
                                <Form.Field>
                                    <div className="ui labeled input">
                                        <label htmlFor="latitude" className="ui label label">Latitude: </label>
                                        <input name="latitude" onChange={this.handleChange} value={this.state.restaurant.latitude} />
                                    </div>
                                </Form.Field>
                                <Form.Field>
                                    <div className="ui labeled input">
                                        <label htmlFor="longitude" className="ui label label">Longitude: </label>
                                        <input name="longitude" onChange={this.handleChange} value={this.state.restaurant.longitude} />
                                    </div>
                                </Form.Field>
                                <Form.Field>
                                    <div className="ui labeled input">
                                        <label htmlFor="phone_number" className="ui label label">Telefone: </label>
                                        <input name="phone_number" onChange={this.handleChange} value={this.state.restaurant.phone_number} />
                                    </div>
                                </Form.Field>
                                <Form.Field>
                                    <div className="ui labeled input">
                                        <label htmlFor="cellphone_number" className="ui label label">Celular: </label>
                                        <input name="cellphone_number" onChange={this.handleChange} value={this.state.restaurant.cellphone_number} />
                                    </div>
                                </Form.Field>
                                <Form.Field>
                                    <div className="ui labeled input">
                                        <label htmlFor="user.email" className="ui label label">Email do usuário: </label>
                                        <input name="user.email" onChange={this.handleChange} value={this.state.restaurant.user.email} />
                                    </div>
                                </Form.Field>
                                <Button primary>Enviar</Button>
                                {error && <p>Erro: {error.message}</p>}
                                {loading && <p>Loading...</p>}
                                {called && !error && !loading && <p>Enviado com sucesso</p>}
                            </Form>
                        </Card.Content>
                    </Card>
                )}
            </Mutation>
        )
    }
}

export default MyProfile