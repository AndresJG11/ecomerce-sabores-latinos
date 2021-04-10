package com.saboreslatinos.core.dto;

import java.util.List;

public class ImagenProductoDto {

	private long idProducto;
	private List<String> imagenes;
	

	public long getIdProducto() {
		return idProducto;
	}
	
	public void setIdProducto(long idProducto) {
		this.idProducto = idProducto;
	}

	public List<String> getImagenes() {
		return imagenes;
	}

	public void setImagenes(List<String> imagenes) {
		this.imagenes = imagenes;
	}
	
	
	
	
}
