package com.saboreslatinos.core.entity;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;


@Table(name="anuncio")
@Entity
public class Anuncio implements Serializable {
	
	

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@GeneratedValue
	@Id
	@Column(name = "idAnuncio")
	private long id;
	
	@Column(name = "titulo")
	private String titulo;
	
	@Column(name = "ruta")
	private String ruta;
	
	@Column(name = "enlace")
	private String enlace;
	
	@Lob @Basic(fetch = FetchType.LAZY) 
	@Column(length=100000) 
	private String picture;


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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	
	
	
	
	
	

}
