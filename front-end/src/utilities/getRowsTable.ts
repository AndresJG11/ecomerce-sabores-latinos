
export const getRowsTable = ( arrObj : Array<any> , keys : Array<string>) => {

    let tuple : Array< Array<any> > = []
    
    arrObj.map && arrObj.map( (obj : any) => 
         tuple.push( keys.map( (objKey) => obj[objKey] ))
    )

    return(tuple)
}