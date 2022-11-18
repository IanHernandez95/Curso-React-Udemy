import { act, renderHook } from "@testing-library/react"
import { useForm } from "../../src/Hooks/useForm"


describe('Pruebas en useForm', () => {

    const initialForm = {
        name: 'ian',
        email: 'ian@gmail.com'
    }

    test('debe de regresar la informacion por defecto', () => {

        const { result } = renderHook( () => useForm(initialForm) )
        expect(result.current).toEqual({
            name: initialForm.name,
            email: initialForm.email,
            formState: initialForm,
            onInputChange: expect.any( Function ),
            onResetForm: expect.any( Function ),
        });

    });

    test('debe de cambiar el nombre del formulario', () => {

        const newValue = 'juan'

        const { result } = renderHook( () => useForm(initialForm) )
        const { onInputChange } = result.current

        act( () => {
            onInputChange({ target: { name: 'name', value: newValue } });
        })

        expect( result.current.name ).toBe(newValue);
        expect( result.current.formState.name ).toBe(newValue);

    });

    test('debe de realizar el rest del formulario', () => {

        const newValue = 'juan'

        const { result } = renderHook( () => useForm(initialForm) )
        const { onInputChange, onResetForm } = result.current

        act( () => {
            onInputChange({ target: { name: 'name', value: newValue } })
            onResetForm()
        })

        expect( result.current.name ).toBe(initialForm.name);
        expect( result.current.formState.name ).toBe(initialForm.name);

    })


})