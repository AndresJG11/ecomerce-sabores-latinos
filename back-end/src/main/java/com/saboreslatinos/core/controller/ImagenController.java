package com.saboreslatinos.core.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
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
	public ResponseEntity<String>  agregarImagenProducto(@RequestParam("file") MultipartFile imagen, @RequestParam("idProducto") long idProducto) {
		
		Optional<Producto> producto =  productoService.obtenerProductoPorId(idProducto);
		
		
		if(producto.isPresent()){
			
			
			if(!imagen.isEmpty()) {
				Path directorioImagenes = Paths.get("src//main//resources//static/images");
				String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();
				
				byte[] bytesImg;
				
				try {
					bytesImg = imagen.getBytes();
					Path rutaCompleta = Paths.get(rutaAbsoluta+"//"+imagen.getOriginalFilename());
					Files.write(rutaCompleta, bytesImg);
					
					Imagen imagenEntidad = new Imagen();
					imagenEntidad.setProducto(producto.get());
					imagenEntidad.setRuta(imagen.getOriginalFilename());
					
					imagenService.agregar(imagenEntidad);
					return new ResponseEntity<>("Imagen agregada  con exito", HttpStatus.OK);
					
				} catch (IOException e) {
					e.printStackTrace();
					return new ResponseEntity<>("Ha ocurrido un errro al guardar la imagen", HttpStatus.INTERNAL_SERVER_ERROR);
				}
					
			}else {
				return new ResponseEntity<>("No hay contenido en la imagen", HttpStatus.PARTIAL_CONTENT);
			}
		}else {
			return new ResponseEntity<>("El producto no existe", HttpStatus.PARTIAL_CONTENT);
		}
		
		
	}
	
	
	@DeleteMapping("/imagen/producto/{id}")
	public boolean eliminarImagen(@PathVariable("id") long  id) {
		return imagenService.eliminar(id);
	}
	
	
	
	
	
	

}
