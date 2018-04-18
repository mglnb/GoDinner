import React from 'react'
import { Form, Input } from 'semantic-ui-react'

const MyProfile = (props) => (
  <Form>
      <Form.Field><Input name="name" label="Nome do Restaurante:" value={props.restaurant.name} /></Form.Field>
      <Form.Field><Input name="subname" label="Slogan:" value={props.restaurant.subname} /></Form.Field>
      <Form.Field><Input name="description" label="Descrição:" value={props.restaurant.description} /></Form.Field>
      <Form.Field><Input name="location" label="Endereço:" value={props.restaurant.location} /></Form.Field>
      <Form.Field><Input name="phone_number" label="Telefone:" value={props.restaurant.phone_number} /></Form.Field>
      <Form.Field><Input name="cellphone_number" label="Celular:" value={props.restaurant.cellphone_number} /></Form.Field>
      <Form.Field><Input name="user.name" label="Nome do usuário:" value={props.restaurant.user.name} /></Form.Field>
      <Form.Field><Input name="user.email" label="Email:" value={props.restaurant.user.email} /></Form.Field>
  </Form>
          )
          
export default MyProfile