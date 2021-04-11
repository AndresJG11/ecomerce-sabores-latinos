package com.saboreslatinos.core.entity;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
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
	
	
	public Imagen(long id, String imagen, Producto producto) {
		super();
		this.id = id;
		this.imagen = imagen;
		this.producto = producto;
	}

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "idImagen")
	private long id;

	@Lob @Basic(fetch = FetchType.LAZY) 
	@Column(length=100000) 
	private String imagen;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idProducto")
	private Producto producto;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}
	
	
	
	
	

}
