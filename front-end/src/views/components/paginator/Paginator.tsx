import { FC } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import './paginator-styles.css'

interface PaginatorProps extends React.HTMLAttributes<HTMLUListElement>{

    readonly setActualPage: Function

    readonly actualPage: number

    readonly totalPages: number

    readonly pagesToShow: number

}
// ToDo: Lógica para controlar el crecimiento del paginador
export const Paginator: FC<PaginatorProps> = ({ actualPage, setActualPage, totalPages, pagesToShow, className }) => {

    const handleNextPage = () => {
        actualPage + 1 <= totalPages && setActualPage(actualPage + 1)
    }
    
    const handlePreviusPage = () => {
        actualPage - 1 >= 1 && setActualPage(actualPage - 1)
    }

    return (
        <Pagination className={"paginator-container " + className}>

            <Pagination.First onClick={() => setActualPage(1)} disabled={ actualPage === 1 } />

            <Pagination.Prev onClick={handlePreviusPage} disabled={ actualPage - 1 < 1 } />

            {
                Array.from({ length: totalPages }, (_, i) => i + 1).map((page: number) =>
                    <Pagination.Item key={page} active={page === actualPage} onClick={() => setActualPage(page)}>{page}</Pagination.Item>
                )
            }

            <Pagination.Next onClick={handleNextPage} disabled={actualPage + 1 > totalPages} />

            <Pagination.Last onClick={() => setActualPage(totalPages)} disabled={ actualPage === totalPages } />

        </Pagination>
    )
}
