package com.saboreslatinos.core.dto;

import java.util.List;

import com.saboreslatinos.core.entity.Producto;

public class ProductoDto {

	private long idProducto;
	
	private String descripcion;
	
	private int descuento;
	
	private String nombre;
	
	private int precio;
	
	private int stock;
	
	private List<ImagenDto> imagenes;
	
	
	public ProductoDto(Producto producto) {
		super();
		this.idProducto = producto.getId();
		this.descripcion = producto.getDescripcion();
		this.descuento = producto.getDescuento();
		this.nombre = producto.getNombre();
		this.precio = producto.getPrecio();
		this.stock = producto.getStock();
	}
	
	public ProductoDto(long idProducto, String descripcion, int descuento, String nombre, int precio, int stock) {
		super();
		this.idProducto = idProducto;
		this.descripcion = descripcion;
		this.descuento = descuento;
		this.nombre = nombre;
		this.precio = precio;
		this.stock = stock;
	}

	public long getIdProducto() {
		return idProducto;
	}

	public void setIdProducto(long idProducto) {
		this.idProducto = idProducto;
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

	public int getDescuento() {
		return descuento;
	}

	public void setDescuento(int descuento) {
		this.descuento = descuento;
	}

	public List<ImagenDto> getImagenes() {
		return imagenes;
	}

	public void setImagenes(List<ImagenDto> imagenes) {
		this.imagenes = imagenes;
	}

	
	
}
