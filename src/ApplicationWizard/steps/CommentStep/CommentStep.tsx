import { Headline, Subheadline, Textarea } from '@telegram-apps/telegram-ui';
import { MessageSquareMore } from 'lucide-react';

export const CommentStep = () => {
  return (
    <div className="stepContainer">
      <div className="stepHeader">
        <div className="stepIcon">
          <MessageSquareMore size={32} />
        </div>
        <Headline weight="1">Дополнительный комментарий</Headline>
        <Subheadline className="stepDesc">
          При необходимости оставьте свободный комментарий
        </Subheadline>
      </div>

      <Textarea header="Комментарий" placeholder="Введите текст..." rows={4} />
    </div>
  );
};
