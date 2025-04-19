import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { useState } from 'react';

import { Layout } from '#view/shared/components';

const initialTasks = {
  todo: ['Купить молоко', 'Сделать зарядку'],
  inProgress: ['Учить React'],
  done: ['Сделал уборку'],
};

export const BoardsPage = () => {
  const [tasks] = useState(initialTasks);

  const renderColumn = (title: string, items: string[]) => (
    <Grid size={{ xs: 12, md: 4 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: 2,
          backgroundColor: '#f9f9f9',
          height: '100%',
        }}
      >
        <Typography
          variant="h6"
          align="left"
          gutterBottom
          sx={{ paddingBottom: 1, borderBottom: '2px solid #ccc' }}
        >
          {title}
        </Typography>
        <Box display="flex" flexDirection="column" gap={1}>
          {items.map((task, index) => (
            <Card key={index} variant="elevation" sx={{ cursor: 'pointer' }}>
              <CardContent sx={{ padding: 1 }}>
                <Typography>{task}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </Grid>
  );

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Grid container spacing={2} alignItems="stretch">
          {renderColumn('To Do', tasks.todo)}
          {renderColumn('In Progress', tasks.inProgress)}
          {renderColumn('Done', tasks.done)}
        </Grid>
      </Box>
    </Layout>
  );
};
