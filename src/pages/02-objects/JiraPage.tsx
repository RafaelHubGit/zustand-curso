import { useEffect, useMemo } from 'react';
import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores';

export const JiraPage = () => {

  const getTasksByStatus = useTaskStore( store => store.getTasksByStatus );
  const tasks = useTaskStore( store => store.tasks );

  const pendingTasks = useMemo(() => getTasksByStatus('open'), [tasks]);
  const inProgressTasks = useMemo(() => getTasksByStatus('in-progress'), [tasks]);
  const doneTasks = useMemo(() => getTasksByStatus('done'), [tasks]);

  console.log({pendingTasks, inProgressTasks, doneTasks});
  

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <JiraTasks title='Pendientes' tasks={ pendingTasks } value='open' />
          
          <JiraTasks title='Avanzando' tasks={ inProgressTasks } value='in-progress' />
          
          <JiraTasks title='Terminadas' tasks={ doneTasks } value='done' />

      </div>

      



    </>
  );
};