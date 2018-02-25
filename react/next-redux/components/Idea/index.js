import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, formValues, reduxForm } from 'redux-form';

import {
  IdeaItem,
  IdeaFiledWrapper,
  BtnDone,
  BtnClose,
  IdeaSelectFiledWrapper,
  BtnWrapper,
} from './style';

import { Dot } from './../';
import { ActionBtn } from './components/ActionBtn';
import { calculateAvg, generateArray } from './../../utils';

@reduxForm({ form: 'idea' })
@connect((state, props) => ({ form: state.form.idea }))
export class Idea extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    submitCahnges: PropTypes.func.isRequired,
    cancelChanges: PropTypes.func.isRequired,
  };

  calculateAvg = () => {
    const { confidence, ease, impact } = this.props.form.values;
    return calculateAvg(confidence, ease, impact);
  }

  onSubmit = values => this.props.submitCahnges(values);

  render() {
    const { handleSubmit } = this.props;
    return (
      <IdeaItem>
        <Dot />
        <IdeaFiledWrapper content>
          <Field name="content" component="input" type="text" placeholder="Content" />
        </IdeaFiledWrapper>
        <IdeaSelectFiledWrapper>
          <IdeaFiledWrapper>
            <Field name="impact" component="select">
              {generateArray().map(op => <option key={op} value={op}>{op}</option>)}
            </Field>
          </IdeaFiledWrapper>
          <IdeaFiledWrapper>
            <Field name="ease" component="select">
              {generateArray().map(op => <option key={op} value={op}>{op}</option>)}
            </Field>
          </IdeaFiledWrapper>
          <IdeaFiledWrapper>
            <Field name="confidence" component="select">
              {generateArray().map(op => <option key={op} value={op}>{op}</option>)}
            </Field>
          </IdeaFiledWrapper>
          <IdeaFiledWrapper>
            {this.calculateAvg()}
          </IdeaFiledWrapper>
          <BtnWrapper>
            <BtnDone>
              <ActionBtn onClick={handleSubmit(this.onSubmit)} src="/static/images/Confirm_V.png" />
            </BtnDone>
            <BtnClose>
              <ActionBtn src="/static/images/Cancel_X.png" onClick={this.props.cancelChanges} />
            </BtnClose>
          </BtnWrapper>
        </IdeaSelectFiledWrapper>
      </IdeaItem>
    );
  }
}
