package com.saboreslatinos.core.model;

import java.util.List;

import com.saboreslatinos.core.entity.Categoria;

public class CategoriaModel {

	
	
	
	public CategoriaModel(Categoria categoria) {
		this.id = categoria.getId();
		this.nombre = categoria.getNombre();
		this.icono = categoria.getIcono();
	}
	
	
	public CategoriaModel() {
		super();
	}

	public CategoriaModel(long id, String icono,String nombre) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.icono = icono;
	}

	private long id;
	
	private String nombre;
	
	private String icono;
	
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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
	
	
	
	
		
	
}
