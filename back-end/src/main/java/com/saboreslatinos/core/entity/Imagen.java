package com.saboreslatinos.core.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@NamedQueries({


	@NamedQuery(name = Imagen.OBTENER_IMAGENES_POR_PRODUCTO, query = "select i from Imagen i where i.producto.id = :id  ")

})
@Table(name="imagen")
@Entity
public class Imagen implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static final String OBTENER_IMAGENES_POR_PRODUCTO = "OBTENER_IMAGENES_POR_PRODUCTO";
	
	public Imagen() {
		
	}
	
	
	public Imagen(long id, String ruta, Producto producto) {
		super();
		this.id = id;
		this.ruta = ruta;
		this.producto = producto;
	}

	@GeneratedValue
	@Id
	@Column(name = "idImagen")
	private long id;

	@Column(name = "ruta")
	private String ruta;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idProducto")
	private Producto producto;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getRuta() {
		return ruta;
	}

	public void setRuta(String ruta) {
		this.ruta = ruta;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}
	
	
	
	
	

}
