import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItem } from "../../src/08-useReducer/TodoItem";


describe('Pruebas en TodoItem', () => { 

    const todo = {
        id: 1,
        description: 'Piedra del alma',
        done: false
    }

    const onDeleteTodoMock = jest.fn();
    const onToggleTodoMock = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostar el Todo pendiente de completar', () => { 

        render( 
            <TodoItem 
                todo={ todo } 
                onToggleTodo={ onToggleTodoMock }
                onDeleteTodo={ onDeleteTodoMock }
            />
        );
        
        const liElement = screen.getByRole('listitem')
        expect( liElement.className ).toBe('list-group-item d-flex justify-content-between');

        const spanElement = screen.getByLabelText('span');
        expect( spanElement.className ).toContain('aling-self-center')
        expect( spanElement.className ).not.toContain('text-decoration-line-through')


    });

    test('debe de mostar el Todo completado', () => { 
        

        todo.done = true

        render( 
            <TodoItem 
                todo={ todo } 
                onToggleTodo={ onToggleTodoMock }
                onDeleteTodo={ onDeleteTodoMock }
            />
        );
        
        const liElement = screen.getByRole('listitem')
        expect( liElement.className ).toBe('list-group-item d-flex justify-content-between');

        const spanElement = screen.getByLabelText('span');
        expect( spanElement.className ).toContain('text-decoration-line-through')

    });

    test('el span debe llamar el toggletodo cuando click', () => {

        render( 
            <TodoItem 
                todo={ todo } 
                onToggleTodo={ onToggleTodoMock }
                onDeleteTodo={ onDeleteTodoMock }
            />
        );

        const spanElement = screen.getByLabelText('span');
        fireEvent.click( spanElement );

        expect( onToggleTodoMock ).toHaveBeenCalledWith( todo.id )
    });

    test('button debe llamara deleteTodo', () => {

        render( 
            <TodoItem 
                todo={ todo } 
                onToggleTodo={ onToggleTodoMock }
                onDeleteTodo={ onDeleteTodoMock }
            />
        );

        const butttonElement = screen.getByRole( 'button' )
        fireEvent.click( butttonElement );

        expect( onDeleteTodoMock ).toHaveBeenCalledWith( todo.id )
    });

});