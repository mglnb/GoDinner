import React from 'react'
import RichText from 'react-rte'
import {Button, Icon} from 'semantic-ui-react'
import {Mutation} from 'react-apollo'
import {ADD_POST, REMOVE_POST, UPDATE_POST} from './graphql'
import {query} from '../RestaurantProfile/graphql'
import firebase from '../../firebase'
const storageRef = firebase.storage().ref()
const postsRef = storageRef.child('posts');
class Modal extends React.Component {
  state = {
    richtext: RichText.createEmptyValue(),
    html: '',
    titleFocus: true,
    image_url: 'http://via.placeholder.com/600x300',
    mutation: ADD_POST
  }
  componentWillMount () {
    if (this.props.posts) {
      this.setState({...this.props.posts, richtext: RichText.createValueFromString(this.props.posts.content, 'html')})
    }
  }
  toolbarConfig = {
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'BLOCK_TYPE_DROPDOWN'],
    INLINE_STYLE_BUTTONS: [
      {label: 'Negrito', style: 'BOLD', className: 'custom-css-class'},
      {label: 'Itálico', style: 'ITALIC'},
      {label: 'Sublinhado', style: 'UNDERLINE'}
    ],
    BLOCK_TYPE_DROPDOWN: [
      {label: 'Normal', style: 'unstyled'},
      {label: 'Título', style: 'header-one'},
      {label: 'Subtítulo', style: 'header-two'},
    ],
    BLOCK_TYPE_BUTTONS: [
      {label: 'Lista não ordenada', style: 'unordered-list-item'},
      {label: 'Lista ordenada', style: 'ordered-list-item'}
    ],
  };
  onChange = (e) => {
    this.setState({richtext: e})
  }
  focusTitle = (e) => {
    this.setState({titleFocus: false})
  }
  blurTitle = (e) => {
    this.setState({titleFocus: true})
  }
  imgClick = () => {
    this.postFile.click()
  }
  handleFileChange = async (e) => {
    const file = e.target.files[0]
    await postsRef.child(file.name).put(file)

    const url = await postsRef.child(file.name).getDownloadURL()
    this.setState({image_url: url})

  }
  closeModal = () => {
    this.setState({image_url: 'http://via.placeholder.com/600x300'})
    this.props.closeModal()
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  handleSubmit = (e, addPost) => {
    this.setState({mutation: ADD_POST})
    addPost({
      variables: {
        id: window.localStorage['id'],
        title: this.state.title,
        content: this.state.richtext.toString('html'),
        status: 1,
        image_url: this.state.image_url
      }
    })
    this.props.closeModal()
  }
  handleUpdate = (e, updatePost) => {
    this.setState({mutation: UPDATE_POST})
   
    updatePost({

      variables: {
        id: this.props.posts.id,
        title: this.state.title,
        content: this.state.richtext.toString('html'),
        status:1,
        image_url: this.state.image_url
      }
    })
    this.props.closeModal()
  }
  handleDelete = (e, deletePost) => {
    this.setState({mutation: REMOVE_POST})

    deletePost({
      variables: {id: this.props.posts.id}
    })
  }
  render () {
    return (

      <React.Fragment>
        <div className={`modal${this.props.active ? ' active' : ''}`}>
          <div className="modal__container">
            <div className="modal__header">
              <span className="close" onClick={this.closeModal}></span>
              <img alt={"Imagem do post"} onClick={this.imgClick} ref={img => this.postImg = img} className="modal__post-img" src={this.state.image_url} />
              <input onChange={this.handleFileChange} ref={file => this.postFile = file} type="file" style={{visibility: 'hidden', height: 0, width: 0}} />
              <input name={'title'} value={this.state.title} onChange={this.handleChange} type="text" onFocus={this.blurTitle} placeholder={'Digite seu título aqui'} />
            </div>
            <div className={`modal__content${this.state.titleFocus ? ' modal__content--title-focus' : ''}`}>
              <RichText toolbarConfig={this.toolbarConfig} value={this.state.richtext} onChange={this.onChange} onFocus={this.focusTitle} placeholder={'Conteúdo'} />
            </div>
            <div className="modal__footer">
              {this.props.posts ? (
                <React.Fragment>
                  <Mutation mutation={REMOVE_POST}  refetchQueries={[{query: query, variables: {id: localStorage['id']}}]}>
                    {(mutation, {loading, error, called, data}) => (
                      <Button labelPosition={'left'} icon onClick={(e) => this.handleDelete(e, mutation)}>
                        {!called && <Icon name='x' />}
                        {called && loading && !error && <Icon name='circle notched' loading />}
                        {called && !loading && error && <Icon name='exclamation triangle' />}
                        {called && !loading && !error && <Icon name='check circle outline' />}
                        {(called && !loading && !error) && this.closeModal()}
                        Deletar
                      </Button>
                    )}
                  </Mutation>
                  <Mutation mutation={UPDATE_POST} refetchQueries={[{query: query, variables: {id: localStorage['id']}}]}>
                    {(mutation, {loading, error, called, data}) => (
                      <Button labelPosition={'right'} icon onClick={(e) => this.handleUpdate(e, mutation)}>
                        {!called && <Icon name='send' />}
                        {called && loading && !error && <Icon name='circle notched' loading />}
                        {called && !loading && error && <Icon name='exclamation triangle' />}
                        {called && !loading && !error && <Icon name='check circle outline' />}
                        Atualizar
                    </Button>
                    )}
                  </Mutation>
                </React.Fragment>
              ) : (
                  <Mutation mutation={ADD_POST}  refetchQueries={[{query: query, variables: {id: localStorage['id']}}]}>
                    {(mutation, {loading, error, called, data}) => (
                      <Button labelPosition={'right'} icon onClick={(e) => this.handleSubmit(e, mutation)}>
                        {!called && <Icon name='send' />}
                        {called && loading && !error && <Icon name='circle notched' loading />}
                        {called && !loading && error && <Icon name='exclamation triangle' />}
                        {called && !loading && !error && <Icon name='check circle outline' />}
                        {(called && !loading && !error) && this.closeModal()}
                        Enviar
                      </Button>
                    )}
                  </Mutation>
                )}
            </div>

          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Modal