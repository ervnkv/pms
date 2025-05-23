import { Button, FormControl } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { TaskDialogModel } from '../model';

type ButtonToBoardProps = {
  model: TaskDialogModel;
};

export const ButtonToBoard = observer(({ model }: ButtonToBoardProps) => {
  if (!model.controls.buttonToBoard.show) {
    return <div></div>;
  }

  return (
    <FormControl variant="filled">
      <Button onClick={() => model.controls.buttonToBoard.onClick?.()}>
        {model.controls.buttonToBoard.text}
      </Button>
    </FormControl>
  );
});
