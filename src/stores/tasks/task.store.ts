import { create, StateCreator } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";


interface TaskState {

    draggingTaskId?: string;
    tasks:  Record<string, Task>, // { [key: string]: Task }

    getTasksByStatus: ( status: TaskStatus) => Task[];


    setDraggingTaskId: ( taskId: string ) => void;
    removeDraggingTaskId: () => void;
    changeTaskStatus: (taskId: string, status: TaskStatus) => void;

}


const storeApi: StateCreator<TaskState> = (set, get) => ({

    draggingTaskId : undefined,

    tasks: {
        'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open'},
        'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress'},
        'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open'},
        'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open'},
    },

    getTasksByStatus: ( status: TaskStatus ) => {
        // const tasks = get().tasks;
        return Object.values( get().tasks ).filter( task => task.status === status );
    },

    setDraggingTaskId: ( taskId: string ) => {
        set({ draggingTaskId: taskId })
    },

    removeDraggingTaskId: () => {
        set({ draggingTaskId: undefined })
    },

    changeTaskStatus: (taskId: string, status: TaskStatus) => {

        // console.log("ID : ", taskId, ' status : ', status);

        const task = get().tasks[taskId];

        // console.log("EL TASK  _ ", task);
        
        task.status = status;

        // console.log("EL TASK cambiado  _ ", task);
        set( (state) => ({
            tasks: {
                ...state.tasks,
                [taskId]: task
            }
        }) )
    }

})

export const useTaskStore = create<TaskState>()(
    devtools(
        storeApi
    )
);