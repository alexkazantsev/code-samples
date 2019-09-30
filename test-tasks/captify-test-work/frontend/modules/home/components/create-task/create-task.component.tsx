import * as React from 'react';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { useDispatch } from 'react-redux';
import { createTaskEffect } from '../../@store/home.effects';
import { Card } from '../card/card.component';

type Props = { form: WrappedFormUtils }

const CreateTask: React.FC<Props> = ({ form }) => {
  const { getFieldDecorator } = form;
  const dispatch = useDispatch();

  const validateAndSubmit = (e) => {
    e.preventDefault();

    form.validateFields(async (error, values) => {
      if (error) {
        return false;
      }
      try {
        await dispatch(createTaskEffect(values));
        form.resetFields();
      } catch (e) {
        message.error(e);
      }
    });
  };

  return (
    <Card title={ 'Create task' }>
      <Form
        layout={ 'horizontal' }
        onSubmit={ validateAndSubmit }
      >
        <Row>
          <Col span={ 8 }>
            <Form.Item>
              { getFieldDecorator('name',
                { rules: [ { required: true, whitespace: true } ] })(
                <Input placeholder={ 'Name' } />,
              ) }
            </Form.Item>
          </Col>
          <Col span={ 6 } offset={ 1 }>
            <Form.Item>
              <Button
                type={ 'primary' }
                onClick={ validateAndSubmit }
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default Form.create()(CreateTask);
