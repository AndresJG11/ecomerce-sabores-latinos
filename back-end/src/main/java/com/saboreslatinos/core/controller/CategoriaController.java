package com.saboreslatinos.core.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

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
import com.saboreslatinos.core.dto.CategoriaDto;
import com.saboreslatinos.core.dto.ProductoDto;
import com.saboreslatinos.core.entity.Categoria;
import com.saboreslatinos.core.model.CategoriaModel;
import com.saboreslatinos.core.service.CategoriaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1")
public class CategoriaController {

	
	@Autowired
	@Qualifier("categoria_servicio")
	private CategoriaService categoriaService;
	
	@PersistenceContext
	EntityManager entityManager;

	
	@GetMapping("/home")
	public ResponseEntity<List<CategoriaDto>> obtenerCategoriasHome() {
		List<CategoriaDto> categorias = new ArrayList<>();
		TypedQuery<CategoriaDto> queryCategorias= entityManager.createNamedQuery(Categoria.GET_CATEGORIAS_HOME, CategoriaDto.class);
		
		categorias = queryCategorias.getResultList();
		
		if(!categorias.isEmpty()) {
			
			for (CategoriaDto categoriaDto : categorias) {
				
				long idCategoria = categoriaDto.getIdCategoria();
				
				List<ProductoDto> productos = new ArrayList<>();
				TypedQuery<ProductoDto> queryProductos= entityManager.createNamedQuery(Categoria.GET_PRODUCTOS_HOME,ProductoDto.class);
				queryProductos.setParameter(1, idCategoria);
				productos = queryProductos.getResultList();
				
				if (!productos.isEmpty()) {
					categoriaDto.setProductos(productos);
				}
				
			}
			
			return  new ResponseEntity<List<CategoriaDto>>(categorias, HttpStatus.ACCEPTED);
			
			
		}else{
			return  new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
		}
		
	}
	
	
	@GetMapping("/categoria")
	public ResponseEntity<List<CategoriaModel>> obtenerCategorias() {
		return  new ResponseEntity<List<CategoriaModel>>(categoriaService.obtener(), HttpStatus.ACCEPTED);
		
	}
	
	@GetMapping("/categoria/{idCategoria}")
	public boolean obtenerProductos(@PathVariable("idCategoria") long  id) {
		return categoriaService.eliminar(id);
	}
	
	
	@PostMapping("/categoria")
	public boolean agregarCategoria(@RequestParam("file") MultipartFile imagen, @RequestParam("nombre") String nombre) {
		
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
				return true;
			} catch (IOException e) {
				e.printStackTrace();
				return false;
			}
				
		}else {
			return false;
		}
		
	}
	
	@PutMapping("/categoria")
	public boolean actualizarCategoria(@RequestBody @Validated Categoria categoria) {
		return categoriaService.actualizar(categoria);
	}
	
	@DeleteMapping("/categoria/{id}")
	public boolean eliminarCategoria(@PathVariable("id") long  id) {
		return categoriaService.eliminar(id);
	}
	
	
	
	
}
