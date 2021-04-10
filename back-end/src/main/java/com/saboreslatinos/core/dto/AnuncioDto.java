package com.saboreslatinos.core.dto;

import java.util.Base64;

import com.saboreslatinos.core.entity.Anuncio;

public class AnuncioDto {

	
	
	private long id;
	
	private String titulo;
	
	private String ruta;
	
	private String enlace;
	private String imagen;
	
	
	public AnuncioDto(Anuncio anuncio) {
		this.id = anuncio.getId();
		this.titulo = anuncio.getTitulo();
		this.ruta = anuncio.getRuta();
		this.enlace = anuncio.getEnlace();
		this.imagen = anuncio.getPicture();
	}
	


	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getRuta() {
		return ruta;
	}

	public void setRuta(String ruta) {
		this.ruta = ruta;
	}

	public String getEnlace() {
		return enlace;
	}

	public void setEnlace(String enlace) {
		this.enlace = enlace;
	}



	public String getImagen() {
		return imagen;
	}



	public void setImagen(String imagen) {
		this.imagen = imagen;
	}
	
	
	
	
	
}
