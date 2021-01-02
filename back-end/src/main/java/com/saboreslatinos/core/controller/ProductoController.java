package com.saboreslatinos.core.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.saboreslatinos.core.converter.Converter;
import com.saboreslatinos.core.dto.ProductoDto;
import com.saboreslatinos.core.entity.Categoria;
import com.saboreslatinos.core.entity.Imagen;
import com.saboreslatinos.core.entity.Producto;
import com.saboreslatinos.core.model.ProductoModel;
import com.saboreslatinos.core.service.ProductoService;


@RestController
@RequestMapping("/v1")
public class ProductoController {

	
	@Autowired
	@Qualifier("producto_servicio")
	private ProductoService productoService;
	
	@PersistenceContext
	EntityManager entityManager;
	
	@Autowired
	@Qualifier("converter")
	private Converter convertidor;
	
	
	@GetMapping("/producto/categoria/{idCategoria}")
	public List<ProductoDto> obtenerProductos(@PathVariable("idCategoria") long  id) {
	
		return productoService.obtenerProductoCategoria(id);
	}
	
	@GetMapping("/producto/{idProducto}")
	public ProductoDto obtenerProducto(@PathVariable("idProducto") long  id) {
	
		ProductoDto productoDto = productoService.obtenerProducto(id);
		productoDto.setImagenes(productoService.obtenerImagenesProducto(id));
		return productoDto ;
	}
	
	
	
}
