import { useState } from "react";
import { useGetTodoQuery, useGetTodosQuery } from "./store/apis/todosApi"


export const TodoApp = () => {

    const [todoID, setTodoID] = useState(1)

    // const { data: todos = [], isLoading } = useGetTodosQuery();
    const { data: todo, isLoading } = useGetTodoQuery( todoID );

    const nextTodo = () =>{
        setTodoID( todoID + 1);
    }

    const prevTodo = () => {
        if ( todoID === 1) return;
        setTodoID( todoID - 1);
    }

    return (
        <>
            <h1>Todos - RTK Query</h1>
            <hr />
            <h4>isLoading: {isLoading ? 'True' : 'False'}</h4>

            <pre>{JSON.stringify( todo )}</pre>


            <button onClick={ prevTodo }>
                prev todo
            </button>
            <button onClick={ nextTodo }>
                next todo
            </button>

            {/* <ul>
                { todos.map( todo => (
                    <li key={ todo.id }>
                        <strong>{ todo.completed ? 'Done: ' : 'Pending: ' }</strong>{ todo.title}
                    </li>
                ) ) }
            </ul> */}


        
        </>
    )
}
