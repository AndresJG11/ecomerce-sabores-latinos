package com.saboreslatinos.core.dto;

import com.saboreslatinos.core.entity.Anuncio;

public class AnuncioDto {

	
	
	private long id;
	
	private String titulo;
	
	private String ruta;
	
	private String enlace;
	
	
	public AnuncioDto(Anuncio anuncio) {
		this.id = anuncio.getId();
		this.titulo = anuncio.getTitulo();
		this.ruta = anuncio.getRuta();
		this.enlace = anuncio.getEnlace();
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
	
	
	
	
	
}
