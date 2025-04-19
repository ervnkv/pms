import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';
import { TasksModel } from './model';

import { Box, Grid } from '@mui/material';

import { ColumnItem } from '#view/shared/components';

type TasksProps = {
  children: ReactNode;
};

type TasksComponentProps = {
  model: TasksModel;
  children: ReactNode;
};

const TasksComponent = observer(({ model, children }: TasksComponentProps) => {
  return (
    <Box
      height={'100%'}
      display={'flex'}
      flexDirection={'column'}
      sx={{ padding: 1 }}
    >
      {children}
      <Grid height={'calc(100% - 80px)'}>
        <ColumnItem
          items={model.tasks}
          buttonColumn={true}
          onClickButtonColumn={() => model.createNewTask()}
          onClickCard={(task) => model.editTask(task)}
        />
      </Grid>
    </Box>
  );
});

export const Tasks = ({ children }: TasksProps) => {
  const model = new TasksModel();
  return <TasksComponent model={model}>{children}</TasksComponent>;
};
