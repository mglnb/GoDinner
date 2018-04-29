import React from 'react'
import RichText from 'react-rte'
import {Button, Icon} from 'semantic-ui-react'
import {Mutation} from 'react-apollo'
import {ADD_POST} from './graphql'
import firebase from '../../firebase'
const storageRef = firebase.storage().ref()
const postsRef = storageRef.child('posts');
class Modal extends React.Component {
  state = {
    richtext: RichText.createEmptyValue(),
    html: '',
    titleFocus: true,
    postSrc: 'http://via.placeholder.com/600x300'
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
    this.setState({postSrc: url})

  }
  closeModal = () => {
    this.setState({postSrc: 'http://via.placeholder.com/600x300'})
    this.props.closeModal()
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  handleSubmit = (e, addPost) => {
    addPost({
      variables: {
        id: window.localStorage['id'],
        title: this.state.title,
        content: this.state.richtext.toString('html'),
        status: 'Draft',
        image_url: this.state.postSrc
      }
    })
  }
  render () {
    return (
      <Mutation mutation={ADD_POST}>
        {(ADD_POST, {called, data, loading, error}) => (
          <React.Fragment>
            <div className={`modal${this.props.active ? ' active' : ''}`}>
              <div className="modal__container">
                <div className="modal__header">
                  <span className="modal__close" onClick={this.closeModal}></span>
                  <img alt={"Imagem do post"} onClick={this.imgClick} ref={img => this.postImg = img} className="modal__post-img" src={this.state.postSrc} />
                  <input onChange={this.handleFileChange} ref={file => this.postFile = file} type="file" style={{visibility: 'hidden', height: 0, width: 0}} />
                  <input name={'title'} value={this.state.title} onChange={this.handleChange} type="text" onFocus={this.blurTitle} placeholder={'Digite seu título aqui'} />
                </div>
                <div className={`modal__content${this.state.titleFocus ? ' modal__content--title-focus' : ''}`}>
                  <RichText toolbarConfig={this.toolbarConfig} value={this.state.richtext} onChange={this.onChange} onFocus={this.focusTitle} placeholder={'Conteúdo'} />
                </div>
                <div className="modal__footer">
                  <Button labelPosition={'right'} icon onClick={(e) => this.handleSubmit(e, ADD_POST)}>
                    <Icon name='send' />
                    Enviar
                  </Button>
                </div>
                {called && !loading && !error && "Sucesso"}
                {called && !loading && error && "Ocorreu um erro"}
                {called && loading && !error && "Carregando"}
              </div>
            </div>
          </React.Fragment>
        )}
      </Mutation>
    )
  }
}

export default Modal