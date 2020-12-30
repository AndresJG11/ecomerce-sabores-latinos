package com.saboreslatinos.core.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Table(name="pais")
@Entity
public class Pais implements Serializable{
	
	
	
	public Pais() {
		
	}
	
	
	
	public Pais(long id, String nombre) {
		super();
		this.id = id;
		this.nombre = nombre;
	}

	@GeneratedValue
	@Id 
	@Column(name = "idPais")
	private long id;
	
	@Column(name = "nombre")
	private String nombre;
	
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy = "pais")
	private List<Producto> productos;

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
	
	

}
