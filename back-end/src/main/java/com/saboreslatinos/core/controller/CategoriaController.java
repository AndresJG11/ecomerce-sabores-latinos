package com.saboreslatinos.core.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
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
import com.saboreslatinos.core.converter.Converter;
import com.saboreslatinos.core.dto.CategoriaDto;
import com.saboreslatinos.core.dto.ProductoDto;
import com.saboreslatinos.core.entity.Categoria;
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
	public ResponseEntity<HashMap<String, Object>> obtenerCategorias(@RequestParam("pageSize") String pageSize,
			@RequestParam("actualPage") String actualPage) {
		
		List<CategoriaDto> listaCategoria = categoriaService.obtener();
	
		if (actualPage.equals("null") || pageSize.equals("null")) {
			HashMap<String, Object> map = new HashMap<>();
			map.put("paginas", 1);
			map.put("categorias", listaCategoria);
		 
			return  new ResponseEntity<HashMap<String, Object>>(map, HttpStatus.OK);
		}else {
			
			HashMap<String, Object> map = new HashMap<>();
			double paginas =(double) listaCategoria.size()/Integer.parseInt(pageSize);
			
			map.put("paginas", Math.round(paginas));
			map.put("categorias", 
					categoriaService.obtenerCategoriasPaginadas(Integer.parseInt(pageSize), Integer.parseInt(actualPage)));
		 
			return  new ResponseEntity<HashMap<String, Object>>(map, HttpStatus.OK);
		}
		
	}
	
	
	
	@PostMapping("/categoria")
	public ResponseEntity<String>  agregarCategoria(@RequestBody @Validated Categoria categoria) {
		
		if(!categoria.getIcono().isEmpty()) {
		
			categoriaService.agregar(categoria);
			return new ResponseEntity<>("Categoria creada  con exito", HttpStatus.OK);
	
		}else {
			return new ResponseEntity<>("No hay contenido en la imagen", HttpStatus.PARTIAL_CONTENT);
		}
		
	}
	
	@PutMapping("/categoria/{id}")
	public ResponseEntity<String>  actualizarCategoria(@RequestBody @Validated Categoria categoria) {
		Optional<Categoria> categoriaEntidad = categoriaService.obtenerCategoriaPorId(categoria.getId());
		
		if (categoriaEntidad.isPresent()) {
			Categoria categoriaActualizada = categoriaEntidad.get();
			categoriaActualizada.setNombre(categoria.getNombre());
			categoriaActualizada.setIcono(categoria.getIcono());
		
			categoriaService.actualizar(categoriaActualizada);
			return new ResponseEntity<>("Categoria actualizada con exito", HttpStatus.OK);
		}
		return new ResponseEntity<>("No existe una categoria con el id: "+categoria.getId(), HttpStatus.NOT_FOUND);
		
	}
	
	@DeleteMapping("/categoria/{id}")
	public ResponseEntity<String>  eliminarCategoria(@PathVariable("id") long  id) {
		
		Optional<Categoria> categoriaEntity = categoriaService.obtenerCategoriaPorId(id);
		
		if (productoService.obtenerProductoCategoria(id).size() > 0 ) {
			return new ResponseEntity<>("No se puede eliminar la categoria porque hay productos asociados a esta", HttpStatus.OK);
		}
		if (categoriaEntity.isPresent()) {
			
			if(categoriaService.eliminar(id)) {
				return new ResponseEntity<>("Categoria eliminada con exito", HttpStatus.OK);
			}else {
				return new ResponseEntity<>("No se pudo eliminar la categoria", HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
		}else {
			return new ResponseEntity<>("No existe una categoria con el id: "+id, HttpStatus.NOT_FOUND);
		}
		
	}
	
}
