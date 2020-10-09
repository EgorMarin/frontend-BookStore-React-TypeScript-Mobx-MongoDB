import React, { useState } from 'react'
import { Button, Col, Comment, Rate, Row, Modal, Form, Input, List, Popconfirm } from 'antd'
import { desc } from '../utils/utils'
import { IComment } from '../interfaces/interface'
import { useUserStore } from '../store/UserModel'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react'
import { useStore } from '../store/StoreModel'

const {TextArea} = Input

const ProductReviews = () => {
  const history = useHistory()

  const { product, setRate, createComment, deleteComment } = useStore()
  const { token, isAdmin, userId } = useUserStore()

  const [text, setText] = useState('')
  const [visible, setVisible] = useState(false)

  const onSetRating = (rate: number) => setRate(rate)
  const onTextHandler = (e: any) => setText(e.target.value)
  const onAddComment = () => {
    createComment({text, dateTime: Date.now()})
    setVisible(false)
    setText('')
  }
  const onOpenModal = () => setVisible(true)
  const onCloseModal = () => setVisible(false)
  const onClickHandler = () => history.push('/user/login')

  return (
    <Row justify='center' style={{marginTop: 30}}>
      <Col xl={14} lg={14} md={14} >
        <Row justify='space-between'>
          <h1>Customer Reviews</h1>
          <Button type="primary" onClick={onOpenModal}>
            Write review
          </Button>

          <Modal
            visible={visible}
            onCancel={onCloseModal}
            footer={[
              <Button key='close' onClick={onCloseModal}>
                Close
              </Button>
            ]}
          >
            { isAdmin
              ? <>
                <h1>You can't write review as seller</h1>
                <h3>If you want to be tricky, sign up as customer</h3>
                <Button onClick={onClickHandler} type="primary">Go to Login Page</Button>
              </> 
              : token
                ? <>
                  <h1>Write your feedback:</h1>
                  <Rate tooltips={desc} onChange={onSetRating} defaultValue={0} allowHalf/>
                  <Comment
                  style={{marginBottom: -35, paddingTop: 15}}
                  content={
                    <>
                      <Form.Item>
                        <TextArea rows={5} value={text} onChange={onTextHandler}/>
                      </Form.Item>
                      <Form.Item>
                        <Button htmlType="submit" onClick={onAddComment} type="primary">
                          Add Comment
                        </Button>
                      </Form.Item>
                    </>
                  }/> 
                </>
                : <>
                  <h1>You have to login for review</h1>
                  <Button onClick={onClickHandler} type="primary">Go to Login Page</Button>
                </>
            }
          </Modal>

        </Row>
        {product?.comments[0] 
          ? <List
              dataSource={product?.comments}
              header={`${product.comments.length} ${product.comments.length > 1 ? 'replies' : 'reply'}`}
              itemLayout="horizontal"
              className='product-comments'
              renderItem={(comment: IComment) => (
                <Comment
                  key={comment.dateTime}
                  author={comment.userName}
                  content={comment.text}
                  datetime={comment.dateTime}
                  actions={
                    comment.userId === userId
                    ? [
                      <Popconfirm 
                        title="Are you sure？" 
                        onConfirm={() => deleteComment(comment._id)} 
                        okText="Yes" 
                        cancelText="No"
                      >
                        <span style={{color: 'red'}}>Delete</span>
                      </Popconfirm>
                    ]
                    : undefined
                  }
                />
              )} 
            />
          : <Row justify='center' className='product-without-comments'>No reviews yet</Row>
        }
      </Col>
    </Row>
  )
}

export default observer(ProductReviews)
