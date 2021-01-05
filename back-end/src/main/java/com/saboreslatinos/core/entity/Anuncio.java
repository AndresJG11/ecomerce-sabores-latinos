package com.saboreslatinos.core.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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

}
