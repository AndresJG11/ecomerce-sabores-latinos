package com.saboreslatinos.core.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Table(name="cliente")
@Entity
public class Cliente implements Serializable {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static final String GET_CLIENTE_POR_ID = "GET_CLIENTE_POR_ID";
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "idCliente")
	private long id;
	
	@Column(name = "documento")
	private String documento;
	
	@Column(name = "telefono")
	private String telefono;
	
	@Column(name = "direccion")
	private String direccion;
	
	@Column(name = "nombre")
	private String nombre;
	
	

	@OneToMany(fetch = FetchType.LAZY,mappedBy = "cliente")
	private List<Venta> ventas;
	
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDocumento() {
		return documento;
	}

	public void setDocumento(String documento) {
		this.documento = documento;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	
	
	

	
}
