package com.saboreslatinos.core.dto;

import com.saboreslatinos.core.entity.Cliente;

public class ClienteDto {
	
	private long id;
	
	private String documento;
	
	private String telefono;
	
	private String direccion;
	
	private String nombre;
	
	

	public ClienteDto(Cliente cliente) {
		
		this.id = cliente.getId();
		this.documento = cliente.getDocumento();
		this.telefono = cliente.getTelefono();
		this.direccion = cliente.getDireccion();
		this.nombre = cliente.getNombre();
	}
	
	

	public ClienteDto(long idCLiente,String documento, String telefono, String direccion, String nombre) {
		super();
	
		this.id = idCLiente;
		this.documento = documento;
		this.telefono = telefono;
		this.direccion = direccion;
		this.nombre = nombre;
	}



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
