package com.saboreslatinos.core.controller;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.saboreslatinos.core.dto.ImagenDto;
import com.saboreslatinos.core.dto.ImagenProductoDto;
import com.saboreslatinos.core.entity.Imagen;
import com.saboreslatinos.core.entity.Producto;
import com.saboreslatinos.core.service.ImagenService;
import com.saboreslatinos.core.service.ProductoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1")
public class ImagenController {
	
	
	@Autowired
	@Qualifier("imagen_servicio")
	private ImagenService imagenService;
	
	@Autowired
	@Qualifier("producto_servicio")
	private ProductoService productoService;
	
	
	@PostMapping("/imagen/producto")
	public ResponseEntity<String> agregarImagenProducto(@RequestBody @Validated ImagenProductoDto imagen) {

		Optional<Producto> producto = productoService.obtenerProductoPorId(imagen.getIdProducto());

		if (producto.isPresent()) {

			for (String imagenData : imagen.getImagenes()) {

				if (!imagenData.isEmpty()) {

					Imagen imagenEntidad = new Imagen();
					imagenEntidad.setProducto(producto.get());
					imagenEntidad.setImagen(imagenData);

					imagenService.agregar(imagenEntidad);
				} else {
					return new ResponseEntity<>("No hay contenido en la imagen", HttpStatus.PARTIAL_CONTENT);
				}
			}
			return new ResponseEntity<>("Imagenes agregadas con exito", HttpStatus.OK);

		} else {
			return new ResponseEntity<>("El producto no existe", HttpStatus.PARTIAL_CONTENT);
		}

	}

	@DeleteMapping("/imagen/producto/{id}")
	public ResponseEntity<String>  eliminarImagen(@PathVariable("id") long  id,@PathVariable("idProducto") long  idProducto) {
		
		Optional<Imagen> imagenEntity = imagenService.obtenerImagenPorId(id);
		
		
		if (imagenEntity.isPresent()) {
			List<ImagenDto> imagenes = productoService.obtenerImagenesProducto(idProducto);
			
			if (imagenes.size() > 1) {
				if (imagenService.eliminar(id)) {
					
					return new ResponseEntity<>("Imagen elimina con exito", HttpStatus.OK);
				}else {
					return new ResponseEntity<>("No se pudo eliminar la imagen", HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}else {
				return new ResponseEntity<>("No se puede eliminar la imagen de este producto porque es la unica", HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
		}else {
			return new ResponseEntity<>("La imagen con el id "+id+" no existe", HttpStatus.NOT_FOUND);
			
		}
 		
	}
	
}
