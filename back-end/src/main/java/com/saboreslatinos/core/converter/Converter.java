package com.saboreslatinos.core.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.saboreslatinos.core.dto.CategoriaDto;
import com.saboreslatinos.core.dto.ImagenDto;
import com.saboreslatinos.core.dto.ProductoDto;
import com.saboreslatinos.core.entity.Categoria;
import com.saboreslatinos.core.entity.Imagen;
import com.saboreslatinos.core.entity.Producto;
import com.saboreslatinos.core.model.CategoriaModel;
import com.saboreslatinos.core.model.ProductoModel;

@Component("converter")
public class Converter {

	
	public List<CategoriaDto> convertirListaCategorias(List<Categoria> categoriasEntity){
		
		List<CategoriaDto> categoriasDto= new ArrayList<>();
		for (Categoria categoriaEntity : categoriasEntity) {
			categoriasDto.add(new CategoriaDto(categoriaEntity));
		}
		return categoriasDto;
	}
	
//	public List<ProductoModel> convertirListaProductos(List<Producto> productosEntity){
//		
//		List<ProductoModel> productosModel = new ArrayList<>();
//		for (Producto productoEntity : productosEntity) {
//			productosModel.add(new ProductoModel(productoEntity));
//		}
//		return productosModel;
//	}
	
public List<ProductoDto> convertirListaProductos(List<Producto> productosEntity){
		
		List<ProductoDto> productosDto = new ArrayList<>();
		for (Producto productoEntity : productosEntity) {
			productosDto.add(new ProductoDto(productoEntity));
		}
		return productosDto;
	}
	
	/// ---------------------- DTO--------------------------------------
	
	public List<ImagenDto> convertirListaImagenesDto(List<Imagen> imagenesEntity){
		
		List<ImagenDto> imagenesDto= new ArrayList<>();
		for (Imagen imagenEntity : imagenesEntity) {
			imagenesDto.add(new ImagenDto(imagenEntity));
		}
		return imagenesDto;
	}
	
	
	
}
