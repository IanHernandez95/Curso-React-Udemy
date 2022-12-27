import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventState, events, initialState } from "../../fixtures/calendarStates";


describe('Pruebas en calendarSlice', () => {

    test('debe regresar el estado inicial', () => {

        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState )

    });

    test('onSetActiveEvent debe de activar el evento', () => {

        const state = calendarSlice.reducer( calendarWithEventState, onSetActiveEvent( events[0]) );
        expect( state.activeEvent ).toEqual( events[0] )

    });

    test('onAddNewEvent debe de agregar el evento', () => {

        const newEvent = {
            id: '3' ,
            title: 'Cumpleaños de Test',
            notes: 'Alguna nota',
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2020-10-21 15:00:00'),
    }
        const state = calendarSlice.reducer( calendarWithEventState, onAddNewEvent( newEvent) );
        expect( state.events ).toEqual([ ...events, newEvent])

    });

    test('onupdateEvent debe de actualizar el evento', () => {

        const updateEvent = {
            id: '1' ,
            title: 'Cumpleaños de Fernando Update',
            notes: 'Alguna nota update',
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2020-10-21 15:00:00'),
    }
        const state = calendarSlice.reducer( calendarWithEventState, onUpdateEvent( updateEvent ) );
        expect( state.events ).toContain( updateEvent )
    });

    test('onDeleteEvent debe de borrar el evento', () => {

        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
        expect( state.activeEvent ).toBe( null )
        expect( state.events ).not.toContain(events[0])
    })

    test('onLoadEvent debe de establecer los evento', () => {

        const state = calendarSlice.reducer( initialState, onLoadEvents(events) );
        expect(state.events.length ).toBe( events.length )
        expect(state.events).toEqual( events )

    });

    test('onLogoutCalendar debe de limpiar el estado', () => {

        const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() );
        expect( state ).toEqual( initialState )
        
    });


    

})