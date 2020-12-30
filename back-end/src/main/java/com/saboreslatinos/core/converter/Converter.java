package com.saboreslatinos.core.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.saboreslatinos.core.entity.Categoria;
import com.saboreslatinos.core.entity.Producto;
import com.saboreslatinos.core.model.CategoriaModel;
import com.saboreslatinos.core.model.ProductoModel;

@Component("converter")
public class Converter {

	
	public List<CategoriaModel> convertirListaCategorias(List<Categoria> categoriasEntity){
		
		List<CategoriaModel> categoriasModel = new ArrayList<>();
		for (Categoria categoriaEntity : categoriasEntity) {
			categoriasModel.add(new CategoriaModel(categoriaEntity));
		}
		return categoriasModel;
	}
	
public List<ProductoModel> convertirListaProductos(List<Producto> productosEntity){
		
		List<ProductoModel> productosModel = new ArrayList<>();
		for (Producto productoEntity : productosEntity) {
			productosModel.add(new ProductoModel(productoEntity));
		}
		return productosModel;
	}
	
	
	
}
