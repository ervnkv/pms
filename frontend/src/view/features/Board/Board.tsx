import { Box, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { appModel } from '#view/app/';
import { TaskDialog } from '#view/features/';
import { ColumnItem } from '#view/shared/components';

const initialTasks = {
  todo: ['Купить молоко', 'Сделать зарядку', 'Купить молоко'],
  inProgress: ['Учить React', 'Учить TS', 'Купить RedBull'],
  done: ['Сделал уборку', 'Сделал код-ревью'],
};

export const Board = observer(function Board() {
  const handleClick = () => {
    appModel.dialog.open(<TaskDialog type="create" />);
  };

  const [tasks] = useState(initialTasks);

  return (
    <Box height={'100%'} sx={{ padding: 2 }}>
      <Grid container spacing={2} height={'100%'}>
        <ColumnItem
          items={tasks.todo}
          onClickCard={handleClick}
          title="To Do"
        />
        <ColumnItem
          items={tasks.inProgress}
          onClickCard={handleClick}
          title="In Progress"
        />
        <ColumnItem items={tasks.done} onClickCard={handleClick} title="Done" />
      </Grid>
    </Box>
  );
});
