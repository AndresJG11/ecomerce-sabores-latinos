package com.saboreslatinos.core.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.saboreslatinos.core.converter.Converter;
import com.saboreslatinos.core.model.ProductoModel;
import com.saboreslatinos.core.repository.ProductoRepository;

@Service("producto_servicio")
public class ProductoService {

	
	@Autowired
	@Qualifier("producto_repository")
	private ProductoRepository productoRepositorio;
	
	@Autowired
	@Qualifier("converter")
	private Converter convertidor;
	
	
	public List<ProductoModel> obtenerProductos(String idCategoria){
		return convertidor.convertirListaProductos(productoRepositorio.findByNombre(idCategoria));
	}
}
