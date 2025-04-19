import { makeAutoObservable } from 'mobx';
import { tasksController } from '#controller/TasksController';
import { Task } from '#shared/types';
import { ApiError } from '#shared/utils';
import { appModel } from '#view/app';
import { TaskDialog, TaskDialogModelProps } from '#view/features/TaskDialog';

export class TasksModel {
  private readonly tasksController = tasksController;
  public isLoading: boolean = true;
  public isError: boolean = false;
  public tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);

    this.getTasks();
  }

  /** Получение всех tasks */
  private getTasks = async () => {
    const res = await this.tasksController.getTasks();
    if (res instanceof ApiError) {
      this.isError = true;
      this.isLoading = false;
    } else {
      this.tasks = res;
      this.isLoading = false;
    }
  };

  /** вызываем модальное окно для создания */
  public createNewTask = () => {
    const taskDialogProps: TaskDialogModelProps = {
      board: null,
      disableFieldBoard: false,
      onSuccess: () => this.getTasks(),
      showButtonToBoard: false,
      task: null,
      type: 'create',
    };
    appModel.dialog.open(TaskDialog(taskDialogProps));
  };
  /** вызываем модальное окно для редактирования task*/
  public editTask = (task: Task) => {
    const taskDialogProps: TaskDialogModelProps = {
      board: null,
      disableFieldBoard: false,
      onSuccess: () => this.getTasks(),
      showButtonToBoard: false,
      task,
      type: 'edit',
    };
    appModel.dialog.open(TaskDialog(taskDialogProps));
  };
}
