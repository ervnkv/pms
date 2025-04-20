import { Box, Typography, Paper, Grid } from '@mui/material';

import { Task } from '#shared/types';

import { BoardTaskCard } from './BoardTaskCard';

type BoardColumnProps = {
  items: Task[];
  title: string;
  onClickTask: (task: Task) => void;
};

export const BoardColumn = ({
  items,
  title,
  onClickTask,
}: BoardColumnProps) => {
  return (
    <Grid height={'100%'} size={{ xs: 12, md: 4 }}>
      <Paper
        variant="outlined"
        sx={{
          margin: 1,
          borderRadius: 2,
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Typography
          position={'sticky'}
          padding={2}
          align="left"
          paddingBottom={1}
          borderBottom={'2px solid #ccc'}
          fontWeight={500}
        >
          {title}
        </Typography>

        <Box display="flex" flexDirection="column" gap={1} padding={2}>
          {items.map((task, index) => (
            <BoardTaskCard key={index} task={task} onClick={onClickTask} />
          ))}
        </Box>
      </Paper>
    </Grid>
  );
};
