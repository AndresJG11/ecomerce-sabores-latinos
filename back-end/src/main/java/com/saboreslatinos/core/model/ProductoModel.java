package com.saboreslatinos.core.model;

import com.saboreslatinos.core.entity.Producto;

public class ProductoModel {
	
	
	public ProductoModel() {
		
	}
	
	public ProductoModel(Producto producto) {
		
		this.id = producto.getId();
		this.nombre = producto.getNombre();
		this.precio = producto.getPrecio();
		this.descripcion = producto.getDescripcion();
		this.stock = producto.getStock();
	}
	
	
	public ProductoModel(long id, String nombre, int precio, String descripcion, int stock) {
		
		this.id = id;
		this.nombre = nombre;
		this.precio = precio;
		this.descripcion = descripcion;
		this.stock = stock;
	}

	private long id;
	
	private String nombre;
	
	private int precio;
	
	private String descripcion;
	
	private int stock;

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

	public int getPrecio() {
		return precio;
	}

	public void setPrecio(int precio) {
		this.precio = precio;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}
	
	

}
