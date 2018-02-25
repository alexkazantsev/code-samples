import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactModal from 'react-modal';

import { DefaultPage, RequireAuth, ApiService } from './../utils';
import { ideaActions, userActions } from './../actions';
import { FETCH_ALL_IDEAS_ERROR } from './../types/idea.types';
import {
  PageWrapper,
  IdeaListHeader,
  IdeaListHeaderWrapper,
  IdeaListHeaderItem,
  ModalWrapper,
  ModalTitle,
  ModalContent,
  ModalBtnWrapper,
  ModalBtn,
} from './../styles/defaultPageStyles';
import {
  EmptyIdeas,
  Header,
  Idea,
  IdeaListItem,
} from './../components';

const styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

@DefaultPage()
@RequireAuth()
@connect(
  state => ({ idea: state.idea }),
  dispatch => ({
    actions: bindActionCreators({ ...ideaActions, ...userActions }, dispatch)
  }),
)
export default class Dashboard extends Component {

  static async getInitialProps({ store: { dispatch } }) {
    try {
      const ideas = await ApiService.instance.get('idea');
      return { ideas };
    } catch (e) {
      dispatch({ type: FETCH_ALL_IDEAS_ERROR, payload: e });
    }
    return {};
  }

  constructor(props) {
    super(props);

    this.state = {
      removeModal: false,
      idToRemove: null,
    };
  }

  showModal = (id) => {
    this.setState({ idToRemove: id, removeModal: true });
  }

  closeModal = () => this.setState({ idToRemove: null, removeModal: false });

  removeIdea = () => {
    this.props.actions.removeIdea(this.state.idToRemove);
    this.setState({ idToRemove: null, removeModal: false });
  }

  onSaveIdea = (idea) => {
    const { saveIdea, updateIdea } = this.props.actions;
    if (idea.id) return updateIdea(idea);
    return saveIdea(idea);
  }

  render() {
    const { ideas } = this.props.idea;
    const { addNewIdea, cancelIdea, saveIdea, setAsUpdated } = this.props.actions;
    return (
      <PageWrapper>
        <Header addAction={addNewIdea} />
        {!ideas.length && <EmptyIdeas />}
        {ideas.length &&
          <IdeaListHeader>
            <IdeaListHeaderWrapper>
              <IdeaListHeaderItem>Impact</IdeaListHeaderItem>
              <IdeaListHeaderItem>Ease</IdeaListHeaderItem>
              <IdeaListHeaderItem>Confidence</IdeaListHeaderItem>
              <IdeaListHeaderItem bold>Avg.</IdeaListHeaderItem>
            </IdeaListHeaderWrapper>
          </IdeaListHeader>
        }
        {ideas.map((idea, i) => {
          if (idea.isNew) {
            return <Idea
              key={i}
              initialValues={idea}
              submitCahnges={this.onSaveIdea}
              cancelChanges={cancelIdea} />;
          }
          return <IdeaListItem
            key={i}
            idea={idea}
            onEditClick={setAsUpdated.bind(this, idea.id)}
            onDeleteClick={this.showModal.bind(this, idea.id)} />;
        })}
        <ReactModal
          isOpen={this.state.removeModal}
          onRequestClose={this.closeModal}
          contentLabel="Foo"
          style={styles}>
          <ModalWrapper>
            <ModalTitle>Are you sure?</ModalTitle>
            <ModalContent>This idea will be permanently deleted.</ModalContent>
            <ModalBtnWrapper>
              <ModalBtn onClick={this.closeModal}>CANCEL</ModalBtn>
              <ModalBtn onClick={this.removeIdea} ok={true}>OK</ModalBtn>
            </ModalBtnWrapper>
          </ModalWrapper>
        </ReactModal>
      </PageWrapper>
    );
  }
}
