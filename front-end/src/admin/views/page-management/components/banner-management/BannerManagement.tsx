import { Carousel, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import { Anuncio } from 'models';
import AnuncioAction from 'stores/anuncio/anuncioAction';
import { Table } from 'react-bootstrap'
import DeleteIcon from 'assets/icons/eliminar.svg'
import EditIcon from 'assets/icons/editar.svg'
import urlRegex from 'utilities/urlRegex';
import './banner-management-styles.css'

const ValidationSchemaInit: Record<string, RegisterOptions> =
{
    titulo: { required: 'Debes ingresar un titulo' },
    imagen: { required: 'Debes agregar una imagen' },
    enlace:
    {
        required: false,
        pattern:
        {
            value: urlRegex,
            message: 'Ingresa una enlace valido'
        }
    },
}

const listHead = ['Titulo', 'Enlace', 'Acción']

//ToDo: Probar Actualizar imagen
export const BannerManagement = () => {

    const dispatch = useDispatch()

    const anuncios: Array<Anuncio> | null = useSelector((state: any) => state.AnuncioReducer.anuncios);

    const { register, handleSubmit, errors, setValue, clearErrors } = useForm({ mode: 'onBlur' });

    const [indexAnuncioActivo, setIndexAnuncioActivo] = useState<number>(0);

    const carouselRef = useRef<{ element: HTMLDivElement }>(null)

    const [carouselHeight, setCarouselHeight] = useState(0)

    const [editAnuncio, setEditAnuncio] = useState<Anuncio | null>(null);

    const [prevImage, setPrevImage] = useState<any>(null);

    const [ValidationSchema, setValidationSchema] = useState<Record<string, RegisterOptions>>(ValidationSchemaInit);

    useLayoutEffect(() => {
        const { current } = carouselRef

        if (current !== null) {
            const { offsetWidth } = current.element

            setCarouselHeight(Math.trunc(offsetWidth / 4))
        }
    }, [carouselHeight])

    useEffect(() => {
        dispatch(AnuncioAction.requestObtenerAnuncios())
    }, [dispatch]);

    const handleCancel = () => {
        setValue('titulo', '')
        setValue('enlace', '')
        setValue('imagen', '')
        setPrevImage(null)
        setEditAnuncio(null)
        setValidationSchema(ValidationSchemaInit)
        clearErrors()
    }

    const handleEditar = (anuncio: Anuncio, index: number) => {
        setEditAnuncio(anuncio)
        setIndexAnuncioActivo(index)
        setValue('titulo', anuncio.titulo)
        setValue('enlace', anuncio?.enlace || '')
        setValidationSchema(
            {
                ...ValidationSchema,
                imagen: { required: false }
            }
        )
    }

    const handleDelete = (anuncio: Anuncio) => {
        const { id } = anuncio
        dispatch(AnuncioAction.requestEliminarAnuncio(id!))
    }

    const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
        if (editAnuncio?.id) {

            const actualizarAnuncio =
            {
                enlace: data.enlace ? data.enlace : '',
                titulo: data.titulo,
                imagen: prevImage || editAnuncio.imagen,
                id: editAnuncio.id,
            }

            dispatch(AnuncioAction.requestActualizarAnuncio(actualizarAnuncio))
            handleCancel()

        } else {
            // Crear anuncio
            const formData = new FormData();

            formData.append('file', data.imagen[0])

            const nuevoAnuncio =
            {
                enlace: data.enlace ? data.enlace : '',
                titulo: data.titulo,
                imagen: prevImage,
            }

            dispatch(AnuncioAction.requestAgregarAnuncio(nuevoAnuncio))
            setPrevImage(null)

        }
    }

    const handleOnSelect = (eventKey: number) => {
        setIndexAnuncioActivo(eventKey)
        setValidationSchema(ValidationSchemaInit)
        setPrevImage(null)

        if (editAnuncio?.id) {
            setValue('titulo', '')
            setValue('enlace', '')
            setValue('imagen', '')
            setEditAnuncio(null)
            clearErrors()
        }

    }

    const onUploadImage = (event: any) => {

        const { target: { files } } = event

        if (!files) return

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPrevImage(fileReader.result)
        }

        fileReader.readAsDataURL(files[0])

    }


    return (
        <div>
            <h6> Gestión de imágenes </h6>

            <div className="mt-3">

                <div className="carrousel-wraper">
                    {
                        !prevImage ?
                            <Carousel
                                ref={carouselRef as any}
                                fade={true}
                                interval={editAnuncio ? null : 3000}
                                prevLabel={""}
                                nextLabel={""}
                                indicators={!window.mobileCheck()}
                                activeIndex={indexAnuncioActivo}
                                onSelect={(eventKey) => handleOnSelect(eventKey)}
                            >
                                {
                                    anuncios &&
                                    anuncios.map((anuncio, idx) =>
                                        <Carousel.Item key={idx}>
                                            <img
                                                className="d-block w-100"
                                                src={anuncio.imagen}
                                                alt={anuncio.titulo}
                                                title={anuncio.titulo}
                                                style={anuncio?.enlace ? { cursor: 'pointer' } : {}}
                                                onClick={() => anuncio?.enlace && window.open(anuncio.enlace)}
                                                height={anuncios.length > 0 ? carouselHeight : 0}
                                            />
                                        </Carousel.Item>
                                    )
                                }
                            </Carousel>
                            :
                            <div>
                                <img
                                    className="d-block w-100"
                                    src={prevImage}
                                    alt={editAnuncio?.titulo || ''}
                                    title={editAnuncio?.titulo || ''}
                                    height={carouselHeight}
                                    style={editAnuncio?.enlace ? { cursor: 'pointer' } : {}}
                                    onClick={() => editAnuncio?.enlace && window.open(editAnuncio.enlace)}
                                />
                                <h6 className="mt-3 text-danger">Vista Previa</h6>
                            </div>

                    }
                </div>

                <Form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">

                        <div className="col-7">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        {
                                            listHead.map((head, idx) => <th key={idx}>{head}</th>)
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        anuncios &&
                                        anuncios.map((anuncio, idx) =>
                                            <tr key={idx}>
                                                <td title={anuncio.titulo}>{anuncio.titulo}</td>
                                                <td ><span className="tabla-banner-texto" title={anuncio?.enlace || ''}><a href={anuncio?.enlace || ''}>{anuncio?.enlace || ''}</a></span></td>
                                                <td>
                                                    <div className="d-flex justify-content-center">
                                                        <button className="btn p-0" type="button" onClick={() => handleEditar(anuncio, idx)} >
                                                            <img title='Editar' src={EditIcon} alt="" style={{ width: '1rem', marginRight: 10 }} />
                                                        </button>
                                                        <button className="btn p-0 ml-3" type="button" onClick={() => handleDelete(anuncio)} >
                                                            <img title='Eliminar' src={DeleteIcon} alt="" style={{ width: '1rem' }} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>


                        </div>

                        <div className="col-5">
                            <FormGroup>
                                <FormLabel> Titulo </FormLabel>
                                <FormControl
                                    type="text"
                                    name="titulo"
                                    ref={register(ValidationSchema.titulo)}
                                    isInvalid={Boolean(errors.titulo)}
                                />
                                {errors.titulo && <FormControl.Feedback type="invalid">{errors.titulo.message}</FormControl.Feedback>}
                            </FormGroup>
                            <FormGroup className="mt-2">
                                <FormLabel> Enlace </FormLabel>
                                <FormControl
                                    type="text"
                                    name="enlace"
                                    placeholder='http(s)://www.ejemplo.com'
                                    ref={register(ValidationSchema.enlace)}
                                    isInvalid={Boolean(errors.enlace)}
                                />
                                {errors.enlace && <FormControl.Feedback type="invalid">{errors.enlace.message}</FormControl.Feedback>}
                            </FormGroup>
                            <FormGroup className="mt-2">
                                <FormLabel>{editAnuncio?.id ? 'Actualizar' : 'Subir'} Imagen</FormLabel>
                                <Form.File
                                    id="custom-file"
                                    accept=".png, .svg"
                                    ref={register(ValidationSchema.imagen)}
                                    isInvalid={Boolean(errors.imagen)}
                                    name="imagen"
                                    onChange={onUploadImage}
                                />
                                <small> <strong>Se recomiendan imágenes con relación 4:1</strong> </small>
                                {errors.imagen && <FormControl.Feedback type="invalid">{errors.imagen.message}</FormControl.Feedback>}
                            </FormGroup>

                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="d-flex justify-content-around">
                            <button onClick={() => handleCancel()} className="btn btn-secondary text-white w-25" type="button">
                                Cancelar
                                </button>
                            <button className="btn btn-admin--yellow w-25" type="submit">
                                {editAnuncio?.id ? 'Editar' : 'Crear nuevo anuncio'}
                            </button>
                        </div>
                    </div>
                </Form>

            </div>

        </div>
    )
}
