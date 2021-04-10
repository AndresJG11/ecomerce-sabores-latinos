package com.saboreslatinos.core.controller;

import java.io.File;
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
import com.saboreslatinos.core.dto.ImagenDto;
import com.saboreslatinos.core.dto.ProductoDto;
import com.saboreslatinos.core.entity.Categoria;
import com.saboreslatinos.core.entity.Pais;
import com.saboreslatinos.core.entity.Producto;
import com.saboreslatinos.core.service.CategoriaService;
import com.saboreslatinos.core.service.PaisService;
import com.saboreslatinos.core.service.ProductoService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1")
public class ProductoController {

	
	@Autowired
	@Qualifier("producto_servicio")
	private ProductoService productoService;
	
	@Autowired
	@Qualifier("categoria_servicio")
	private CategoriaService categoriaService;
	
	@Autowired
	@Qualifier("pais_servicio")
	private PaisService paisService;
	
	@PersistenceContext
	EntityManager entityManager;
	
	@Autowired
	@Qualifier("converter")
	private Converter convertidor;
	
	
	@GetMapping("/producto/categoria/{idCategoria}")
	public ResponseEntity<HashMap<String, Object>> obtenerProductos(@PathVariable("idCategoria") long  id,
			@RequestParam("pageSize") String pageSize,
			@RequestParam("actualPage") String actualPage) {
	
		List<ProductoDto> listaProductos =  productoService.obtenerProductoCategoria(id);
		Optional<Categoria> categoria = categoriaService.obtenerCategoriaPorId(id);
		String nombreCategoria = "" ;
		if(categoria.isPresent()) {
			nombreCategoria = categoria.get().getNombre();
		}
		
		
		if (actualPage.equals("null") || pageSize.equals("null")) {
			HashMap<String, Object> map = new HashMap<>();
			for (ProductoDto productoDto : listaProductos) {
				productoDto.setImagenes(productoService.obtenerImagenesProducto(productoDto.getIdProducto()));
			}
			map.put("paginas", 1);
			map.put("nombreCategoria", nombreCategoria);
			map.put("categorias", listaProductos);
			
			return  new ResponseEntity<HashMap<String, Object>>(map, HttpStatus.OK);
		}else {
			HashMap<String, Object> map = new HashMap<>();
			double paginas =(double) listaProductos.size()/Integer.parseInt(pageSize);
			
			List<ProductoDto> listaProductosResultado = 
					productoService.obtenerProductoCategoriaPaginados(id, Integer.parseInt(pageSize), Integer.parseInt(actualPage));
			for (ProductoDto productoDto : listaProductosResultado) {
				productoDto.setImagenes(productoService.obtenerImagenesProducto(productoDto.getIdProducto()));
			}
			map.put("paginas", Math.round(paginas));
			map.put("nombreCategoria", nombreCategoria);
			map.put("categorias", listaProductosResultado);
			return  new ResponseEntity<HashMap<String, Object>>(map, HttpStatus.OK);
			
		}
	}
	
	@GetMapping("/producto/{idProducto}")
	public ProductoDto obtenerProducto(@PathVariable("idProducto") long  id) {
	
		ProductoDto productoDto = productoService.obtenerProducto(id);
		if (productoDto != null) {
			productoDto.setImagenes(productoService.obtenerImagenesProducto(id));
			return productoDto;
		}else {
			return null;
		}
		
	}
	
	
	@PostMapping("/producto")
	public ResponseEntity<String>  agregarProducto(@RequestBody @Validated Producto producto) {
	
		Optional<Categoria> categoria =  categoriaService.obtenerCategoriaPorId(producto.getCategoria().getId());
		Optional<Pais> pais = paisService.obtenerPaisPorId(producto.getPais().getId());
		
		if (categoria.isPresent() && pais.isPresent()) {
			
			producto.setCategoria(categoria.get());
			producto.setPais(pais.get());
			productoService.agregar(producto);
			
			return new ResponseEntity<>("Producto agregado con exito", HttpStatus.OK);
			
		}else {
			return new ResponseEntity<>("Algun id provisto no corresponde a una entidad", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
	}
	
	
	@PutMapping("/producto")
	public ResponseEntity<String>  actualizarProducto(@RequestBody Producto producto) {
		
		Optional<Producto> productoData =  productoService.obtenerProductoPorId(producto.getId());
		
		if (productoData.isPresent()) {
			
			Optional<Categoria> categoria =  categoriaService.obtenerCategoriaPorId(producto.getCategoria().getId());
			Optional<Pais> pais = paisService.obtenerPaisPorId(producto.getPais().getId());
			
			if (categoria.isPresent() && pais.isPresent()) {
				Producto productoActualizado = productoData.get();
				productoActualizado.setCategoria(categoria.get());
				productoActualizado.setDescripcion(producto.getDescripcion());
				productoActualizado.setDescuento(producto.getDescuento());
				productoActualizado.setNombre(producto.getNombre());
				productoActualizado.setPais(pais.get());
				productoActualizado.setPrecio(producto.getPrecio());
				productoActualizado.setStock(producto.getStock());
				productoService.agregar(productoActualizado);
				return new ResponseEntity<>("Producto actualizado con exito", HttpStatus.OK);
				
			}else {
				return new ResponseEntity<>("Algun id provisto no corresponde a una entidad", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}else { 
			return new ResponseEntity<>("El id del producto es incorrecto ", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	
	}
	
	
	@DeleteMapping("/producto/{id}")
	public ResponseEntity<String>  eliminarProducto(@PathVariable("id") long  id) {
		
		Optional<Producto> productoEntity = productoService.obtenerProductoPorId(id);
		
		if (productoEntity.isPresent()) {
			
			List<ImagenDto> imagenes = productoService.obtenerImagenesProducto(id);
			
			for (ImagenDto imagenDto : imagenes) {
				
				File imagenData = new File("src//main//resources//static/images//"+imagenDto.getImagen());
				if(imagenData.exists()) {
					imagenData.delete();
				}
			}
			
			if(productoService.eliminar(id)) {
				return new ResponseEntity<>("Producto eliminado con exito", HttpStatus.OK);
			}else {
				return new ResponseEntity<>("No se pudo eliminar el produco", HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
		}else {
			return new ResponseEntity<>("El producto con el id "+id+" no existe", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
		
	}
	
	
	
}
