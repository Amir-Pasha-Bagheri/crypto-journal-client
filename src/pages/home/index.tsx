import { openModal } from 'core/slices/modalSlice';
import { useAppDispatch } from 'utils/hooks/redux';
import CreateJournal from './components/CreateJournal';
import { Button } from '@mui/material';

export default function Home() {
  const dispatch = useAppDispatch();

  const openCreateJournalModal = () => {
    dispatch(
      openModal({
        key: 'create-journal',
        body: <CreateJournal />,
        title: 'Create New Journal',
        maxWidth: 'lg',
      })
    );
  };

  return (
    <div>
      <Button onClick={openCreateJournalModal}>Create Journal</Button>
    </div>
  );
}
