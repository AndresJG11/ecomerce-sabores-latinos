package com.saboreslatinos.core.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.saboreslatinos.core.converter.Converter;
import com.saboreslatinos.core.dto.CategoriaDto;
import com.saboreslatinos.core.dto.ProductoDto;
import com.saboreslatinos.core.entity.Categoria;
import com.saboreslatinos.core.entity.Imagen;
import com.saboreslatinos.core.entity.Producto;
import com.saboreslatinos.core.model.CategoriaModel;
import com.saboreslatinos.core.service.CategoriaService;
import com.saboreslatinos.core.service.ProductoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1")
public class CategoriaController {

	
	@Autowired
	@Qualifier("categoria_servicio")
	private CategoriaService categoriaService;
	
	@Autowired
	@Qualifier("producto_servicio")
	private ProductoService productoService;
	
	@Autowired
	@Qualifier("converter")
	private Converter convertidor;
	
	@PersistenceContext
	EntityManager entityManager;

	
	@GetMapping("/categoria/home")
	public ResponseEntity<List<CategoriaDto>> obtenerCategoriasHome() {
		
		List<CategoriaDto> categorias = categoriaService.obtener();
		
		if(!categorias.isEmpty()) {
			
			for (CategoriaDto categoriaDto : categorias) {
				
				long idCategoria = categoriaDto.getIdCategoria();
				
				List<ProductoDto> productos = productoService.obtenerProductoCategoria(idCategoria);
			
				if (!productos.isEmpty()) {
					categoriaDto.setProductos(productos);
					
					for (ProductoDto productoDto : productos) {
						
						productoDto.setImagenes(productoService.obtenerImagenesProducto(productoDto.getIdProducto()));
						
					}
				}
			}
			
			return  new ResponseEntity<List<CategoriaDto>>(categorias, HttpStatus.ACCEPTED);
			
		}else{
			
			return  new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
		}
	}
	
	
	@GetMapping("/categoria")
	public ResponseEntity<List<CategoriaDto>> obtenerCategorias() {
		return  new ResponseEntity<List<CategoriaDto>>(categoriaService.obtener(), HttpStatus.OK);
	}
	

	
	@PostMapping("/categoria")
	public ResponseEntity<String>  agregarCategoria(@RequestParam("file") MultipartFile imagen, @RequestParam("nombre") String nombre) {
		
		Categoria categoria = new Categoria();
		categoria.setNombre(nombre);
		
		
		if(!imagen.isEmpty()) {
			Path directorioImagenes = Paths.get("src//main//resources//static/images");
			String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();
			
			byte[] bytesImg;
			
			try {
				bytesImg = imagen.getBytes();
				Path rutaCompleta = Paths.get(rutaAbsoluta+"//"+imagen.getOriginalFilename());
				Files.write(rutaCompleta, bytesImg);
				categoria.setIcono(imagen.getOriginalFilename());
				categoriaService.agregar(categoria);
				return new ResponseEntity<>("Categoria creada  con exito", HttpStatus.OK);
			} catch (IOException e) {
				e.printStackTrace();
				return new ResponseEntity<>("Ha ocurrido un errro al guardar la imagen", HttpStatus.INTERNAL_SERVER_ERROR);
			}
				
		}else {
			return new ResponseEntity<>("No hay contenido en la imagen", HttpStatus.PARTIAL_CONTENT);
		}
		
	}
	
	@PutMapping("/categoria/{id}")
	public ResponseEntity<String>  actualizarCategoria(@RequestParam("nombre") String nombre,@PathVariable("id") long  id) {
		Optional<Categoria> categoriaEntidad = categoriaService.obtenerCategoriaPorId(id);
		
		if (categoriaEntidad.isPresent()) {
			Categoria categoriaActualizada = categoriaEntidad.get();
			categoriaActualizada.setNombre(nombre);
			categoriaService.actualizar(categoriaActualizada);
			return new ResponseEntity<>("Categoria actualizada con exito", HttpStatus.OK);
		}
		return new ResponseEntity<>("No existe una categoria con el id: "+id, HttpStatus.NOT_FOUND);
		
	}
	
	
	@PutMapping("/categoria/imagen/{id}")
	public ResponseEntity<String>  actualizarImagenCategoria(@RequestParam("file") MultipartFile imagen,@PathVariable("id") long  id) {
		
	
		Optional<Categoria> categoriaEntidad = categoriaService.obtenerCategoriaPorId(id);
		if (categoriaEntidad.isPresent()) {
			
			Categoria categoriaActualizada = categoriaEntidad.get();
			
			if(!imagen.isEmpty()) {
				
				File imagenAntigua = new File("src//main//resources//static/images//"+categoriaActualizada.getIcono());
				if(imagenAntigua.exists()) {
					imagenAntigua.delete();
				}
				
				Path directorioImagenes = Paths.get("src//main//resources//static/images");
				String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();
				
				byte[] bytesImg;
				
				try {
					bytesImg = imagen.getBytes();
					Path rutaCompleta = Paths.get(rutaAbsoluta+"//"+imagen.getOriginalFilename());
					Files.write(rutaCompleta, bytesImg);
					categoriaActualizada.setIcono(imagen.getOriginalFilename());
					categoriaService.actualizar(categoriaActualizada);
					return new ResponseEntity<>("Imagen actualizada con exito", HttpStatus.OK);
				} catch (IOException e) {
					e.printStackTrace();
					return new ResponseEntity<>("Ha ocurrido un errro al guardar la imagen", HttpStatus.INTERNAL_SERVER_ERROR);
				}
					
			}else {
				return new ResponseEntity<>("No hay contenido en la imagen", HttpStatus.PARTIAL_CONTENT);
			}
		
		}
		return new ResponseEntity<>("No existe una categoria con el id"+id, HttpStatus.NOT_FOUND);
		
	}
	
	@DeleteMapping("/categoria/{id}")
	public boolean eliminarCategoria(@PathVariable("id") long  id) {
		return categoriaService.eliminar(id);
	}
	
	
	
	
}
