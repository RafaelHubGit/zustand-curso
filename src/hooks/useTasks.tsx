import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";

interface Options {
    status: TaskStatus
}


export const useTasks = ( { status }: Options ) => {

    const isDragging = useTaskStore( state => !!state.draggingTaskId );
    const onTaskDrop = useTaskStore( state => state.onTaskDrop );
    const addTask = useTaskStore( state => state.addTask );

    const [onDragOver, setOnDragOver] = useState(false);

    const handleAddTask = async () => {

    const { isConfirmed, value } = await Swal.fire({
        title: 'Nueva Tarea',
        input: 'text',
        inputLabel: 'Ingrese la nueva tarea',
        showCancelButton: true,
        inputValidator: ( value ) => {
        if ( !value ){
            return 'Debe ingresar un nombre para la tarea';
        }
        }
    })

    if( !isConfirmed ) return;

    addTask( value, status );
    }

    const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setOnDragOver( true );
    }

    const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setOnDragOver( false );
    }

    const handleDragDrop = (e: DragEvent) => {
    e.preventDefault();
    setOnDragOver( false );
    onTaskDrop( status );
    }
 
  
    return {
        //properties
        isDragging,

        //metodos
        onDragOver,
        handleAddTask,
        handleDragOver,
        handleDragLeave,
        handleDragDrop
    }
}
