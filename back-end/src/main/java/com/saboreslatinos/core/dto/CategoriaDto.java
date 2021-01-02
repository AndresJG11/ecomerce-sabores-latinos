package com.saboreslatinos.core.dto;

import java.util.List;

import com.saboreslatinos.core.entity.Categoria;

public class CategoriaDto {
	
	private long idCategoria;
	
	private String nombre;
	
	private String icono;
	
	private List<ProductoDto> productos;
	
	public CategoriaDto(Categoria categoria) {
		super();
		this.idCategoria = categoria.getId();
		this.nombre = categoria.getNombre();
		this.icono = categoria.getIcono();
	}

	public CategoriaDto(long idCategoria, String icono, String nombre) {
		super();
		this.idCategoria = idCategoria;
		this.nombre = nombre;
		this.icono = icono;
	}

	public long getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(long idCategoria) {
		this.idCategoria = idCategoria;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getIcono() {
		return icono;
	}

	public void setIcono(String icono) {
		this.icono = icono;
	}

	public List<ProductoDto> getProductos() {
		return productos;
	}

	public void setProductos(List<ProductoDto> productos) {
		this.productos = productos;
	}
	
	
	
	
	
	

}
