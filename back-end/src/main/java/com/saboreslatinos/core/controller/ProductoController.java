package com.saboreslatinos.core.controller;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saboreslatinos.core.converter.Converter;
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
	public List<ProductoModel> obtenerProductos(@PathVariable("idCategoria") long  id) {
		
		TypedQuery<Producto> query = entityManager.createNamedQuery(Producto.OBTENER_PRODUCTOS_POR_CATEGORIA, Producto.class);
		query.setParameter("categoria", id);
		List<Producto> productos = query.getResultList();
		
		return convertidor.convertirListaProductos(productos);
	}
	
	
}
