import { useAppSelector } from 'utils/hooks/redux';
import ModalComponent from './ModalComponent';

const GlobalModal = () => {
  const modalPack = useAppSelector((state) => state.modal);

  return (
    <>
      {modalPack.map(({ key, ...props }, index) => (
        <ModalComponent key={key} {...props} index={index} />
      ))}
    </>
  );
};

export default GlobalModal;
