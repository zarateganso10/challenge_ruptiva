import React from 'react'

import { Modal, Button } from 'react-bootstrap'

import { Content } from './styles'

interface WishesProps {
  id: string
  user_id: string
  name: string
  description: string
  created_at: Date
  updated_at: Date
  format_date: Date
}

interface ModalContainerProps {
  iten: WishesProps
  show: boolean
  onHide(): void
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  iten,
  show = false,
  onHide
}) => {
  return (
    <Modal
      show={show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Item {iten.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Content>
          <strong>Descrição: {iten.description}</strong>
          <strong>Criado: {iten.format_date}</strong>
        </Content>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalContainer
