import { makeAutoObservable } from 'mobx';

import { Board, Task } from '#shared/types';
import { appModel } from '#view/app';
import { TaskDialog, TaskDialogModelProps } from '#view/features';

import { BoardProps } from '../Board';

export class BoardModel {
  public tasks: Task[];
  public board: Board;

  private getBoardTasks: VoidFunction;

  constructor(props: BoardProps) {
    makeAutoObservable(this);

    this.tasks = props.tasks;
    this.board = props.board;
    this.getBoardTasks = props.getBoardTasks;
  }

  public get taskToDo() {
    return this.tasks.filter(({ status }) => status === 'Backlog');
  }
  public get taskInProgress() {
    return this.tasks.filter(({ status }) => status === 'InProgress');
  }
  public get taskDone() {
    return this.tasks.filter(({ status }) => status === 'Done');
  }

  public editTask = (task: Task) => {
    const taskDialogProps: TaskDialogModelProps = {
      board: this.board,
      disableFieldBoard: true,
      onSuccess: () => this.getBoardTasks(),
      showButtonToBoard: false,
      task,
      type: 'edit',
    };
    appModel.dialog.open(TaskDialog(taskDialogProps));
  };
}
