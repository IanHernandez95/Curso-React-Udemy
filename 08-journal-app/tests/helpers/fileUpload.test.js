import { v2 as cloudinary } from 'cloudinary';

import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name:'dktugn9rj',
    api_key:'263285238797876',
    api_secret:'6WGRX_2Ytijc9pYdkpdt1feOX_Q',
    secure: true
})



describe('Pruebas en fileUpload', () => {

    test('Debe de subir el archivo correctamente a cloudinary', async() => {

        const imageUrl = 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg')

        const url = await fileUpload( file );
        expect( typeof url).toBe('string')

        // console.log(url);
        const segments = url.split('/')
        const imageID = segments[ segments.length -1 ].replace('.jpg','')
        
        const cloudResp = await cloudinary.api.delete_resources([ 'journal-app/' + imageID ],{
            resource_type: 'image'
        })
        // console.log( cloudResp );

    });

    test('debe de retornar null', async() => {

        const file = new File([], 'foto.jpg')
        const url = await fileUpload( file );
        expect( url ).toBe( null )


    })

})