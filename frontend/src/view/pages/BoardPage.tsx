import { observer } from 'mobx-react-lite';

import { appModel } from '#view/app/';
import { TaskDialog } from '#view/features/TaskDialog/TaskDialog';
import { Layout } from '#view/shared/components';

export const BoardPage = observer(function BoardPage() {
  const handleClick = () => {
    appModel.dialog.open(
      <TaskDialog
        board={{
          "id": 4,
          "name": "Миграция на новую БД",
          "description": "Перенос данных на PostgreSQL 15",
          "taskCount": 8
      }}
        task={null}
        type="create"
        disableFieldBoard={false}
        showButtonToBoard
      />,
    );
  };
  return (
    <Layout>
      <span>ДОСКА</span>

      <button onClick={handleClick}>открыть модалку</button>
    </Layout>
  );
});
