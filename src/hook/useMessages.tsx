import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {
  IQuestionMessageProps,
  QuestionMessage,
  AlertMessage,
  IAlertMessageProps,
} from '@/components/Messages';

type TAlertMessageProps = Omit<IAlertMessageProps, 'onClose'>;
type TQuestionProps = Omit<IQuestionMessageProps, 'onDismiss'>;

type TTypes = 'QUESTION' | 'MESSAGE';

interface IQuestionProp extends TQuestionProps {
  type: 'QUESTION';
  onDismiss?(): void;
}

interface IMessageProps extends TAlertMessageProps {
  type: 'MESSAGE';
}

interface IProps {
  onShowMessage(data: IQuestionProp | IMessageProps): void;
}

const MessagesContext = createContext({} as IProps); //funçaõ nativado react

const initAlertMessage: IQuestionProp | IMessageProps = {
  type: 'MESSAGE',
  title: '',
  messageType: 'success',
  buttonText: '',
  description: '',
  isVisible: false,
};

export function MessagesProvider({ children }: PropsWithChildren) {
  const [alertMessage, setAlertMessage] = useState<IQuestionProp | IMessageProps>(initAlertMessage);

  const handleShowMessage = useCallback(
    (data: IQuestionProp | IMessageProps) => {
      setAlertMessage({
        ...data,
      });
    },
    [setAlertMessage],
  );

  const values = useMemo(
    (): IProps => ({
      onShowMessage: handleShowMessage,
    }),
    [handleShowMessage],
  );

  const messageComponent = useMemo((): React.ReactNode => {
    const component: Record<TTypes, React.ReactNode> = {
      MESSAGE: (
        <AlertMessage
          callback={(alertMessage as IMessageProps)?.callback}
          buttonText={(alertMessage as IMessageProps).buttonText}
          description={(alertMessage as IMessageProps).description}
          isVisible={(alertMessage as IMessageProps).isVisible}
          onClose={() =>
            setAlertMessage((pS) => ({
              ...pS,
              isVisible: false,
            }))
          }
          title={(alertMessage as IMessageProps).title}
          messageType={(alertMessage as IMessageProps).messageType}
        />
      ),
      QUESTION: (
        <QuestionMessage
          description={(alertMessage as IQuestionProp)?.description}
          title={(alertMessage as IQuestionProp)?.title}
          isVisible={(alertMessage as IQuestionProp)?.isVisible}
          onConfirm={(alertMessage as IQuestionProp)?.onConfirm}
          messageType={(alertMessage as IQuestionProp)?.messageType}
          onDismiss={() => {
            const onDismissCallback = (alertMessage as IQuestionProp).onDismiss;

            if (onDismissCallback) {
              onDismissCallback();
            }

            setAlertMessage((pS) => ({
              ...pS,
              isVisible: false,
            }));
          }}
        />
      ),
    };

    return component[alertMessage.type];
  }, [alertMessage]);

  return (
    <MessagesContext.Provider value={values}>
      {messageComponent}
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessagesContext);
  return context;
}
