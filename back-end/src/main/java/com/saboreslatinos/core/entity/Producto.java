package com.saboreslatinos.core.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;



@NamedQueries({

	@NamedQuery(name = Producto.OBTENER_PRODUCTOS_POR_CATEGORIA, query = "select p from Producto p where p.categoria.id = :categoria ")

})
@Table(name="producto")
@Entity
public class Producto implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static final String OBTENER_PRODUCTOS_POR_CATEGORIA = "OBTENER_PRODUCTOS_POR_CATEGORIA";
	
	
	public Producto() {
		
		
	}
	
	
	public Producto(long id, String nombre, int precio, String descripcion, int stock) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.precio = precio;
		this.descripcion = descripcion;
		this.stock = stock;
	}

	@GeneratedValue
	@Id
	@Column(name = "idProducto")
	private long id;
	
	@Column(name = "nombre")
	private String nombre;
	
	@Column(name = "precio")
	private int precio;
	
	@Column(name = "descripcion")
	private String descripcion;
	
	@Column(name = "stock")
	private int stock;
	
	@Column(name = "descuento")
	private int descuento;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idCategoria")
	private Categoria categoria;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idPais")
	private Pais pais;
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy = "producto")
	private List<Imagen> imagenes;
	
	@OneToOne(mappedBy = "producto")
    private DetalleVenta detalleVenta;

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


	public Categoria getCategoria() {
		return categoria;
	}


	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public Pais getPais() {
		return pais;
	}

	public void setPais(Pais pais) {
		this.pais = pais;
	}
	
	
	

}
