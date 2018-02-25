import { Dot } from './../';
import { ActionBtn } from './ActionBtn';
import {
  ListItemWrapper,
  TextWrapper,
  SideWrapper,
  ActionBtnsWrapper,
  BtnEdit,
  BtnDelete,
} from './style';

export const IdeaListItem = ({ idea, onEditClick, onDeleteClick }) => (
  <ListItemWrapper>
    <SideWrapper position="left">
      <Dot />
      <TextWrapper content hasPadding>{idea.content}</TextWrapper>
    </SideWrapper>
    <SideWrapper>
      <TextWrapper small>{idea.impact}</TextWrapper>
      <TextWrapper small>{idea.ease}</TextWrapper>
      <TextWrapper small>{idea.confidence}</TextWrapper>
      <TextWrapper small bold>{idea.average_score}</TextWrapper>
      <ActionBtnsWrapper>
        <BtnEdit>
          <ActionBtn src="/static/images/pen.png" onClick={onEditClick} />
        </BtnEdit>
        <BtnDelete>
          <ActionBtn src="/static/images/bin.png" onClick={onDeleteClick} />
        </BtnDelete>
      </ActionBtnsWrapper>
    </SideWrapper>
  </ListItemWrapper>
);
