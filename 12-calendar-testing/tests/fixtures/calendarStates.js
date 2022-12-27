export const events = [
    {
            id: '1' ,
            title: 'Cumpleaños de Fernando',
            notes: 'Alguna nota',
            start: new Date('2022-10-21 13:00:00'),
            end: new Date('2022-10-21 15:00:00'),
    },
    {
            id: '2' ,
            title: 'Cumpleaños de Melisa',
            notes: 'Alguna nota',
            start: new Date('2022-09-09 13:00:00'),
            end: new Date('2022-09-09 15:00:00'),
    },
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
};

export const calendarWithEventState = {
    isLoadingEvents: true,
    events: [...events],
    activeEvent: null
};

export const calendarWithActiveEventState = {
    isLoadingEvents: true,
    events: [...events],
    activeEvent: {...events[0]}
};

