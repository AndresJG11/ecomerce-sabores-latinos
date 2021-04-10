package com.saboreslatinos.core.dto;

import com.saboreslatinos.core.entity.Imagen;

public class ImagenDto {

	
	private long idImagen;
	
	private String imagen;
	
	public ImagenDto(long idImagen, String imagen, String idProducto) {
		this.setIdImagen(idImagen);
		this.imagen = imagen;
	} 
	
	public ImagenDto(Imagen imagen) {
		this.setIdImagen(imagen.getId());
		this.imagen = imagen.getImagen();
	}

	

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public long getIdImagen() {
		return idImagen;
	}

	public void setIdImagen(long idImagen) {
		this.idImagen = idImagen;
	}

	
	
	
}
