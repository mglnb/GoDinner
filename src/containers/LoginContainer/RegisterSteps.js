import React from 'react'
const RegisterSteps = (props) => (
  <div className={"register__steps"}>
    <div className={`register__steps--1 ${props.step > 1 && 'passed'} ${props.step === 1 && 'active'}`} data-number="1">
      <h4>Informações Empresariais</h4>
    </div>
    <div className={`register__steps--1 ${props.step > 2 && 'passed'} ${props.step === 2 && 'active'}`} data-number="2">
      <h4>Endereço</h4>
    </div>
    <div className={`register__steps--1 ${props.step > 3 && 'passed'} ${props.step === 3 && 'active'}`} data-number="3">
      <h4>Usuário</h4>
    </div>
  </div>
)

export default RegisterSteps