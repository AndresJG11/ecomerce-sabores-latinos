package com.saboreslatinos.core.dto;

import com.saboreslatinos.core.entity.Venta;

public class VentaDto {

	private long idVenta;
	
	private int estado;
	
	private String fecha;
	
	private String telefono;
	
	private String nombreCliente; 
	
	private double precioTotal;
	
	
	public VentaDto(Venta ventaEntity){
		this.idVenta = ventaEntity.getId();
		this.estado = ventaEntity.getEstado();
		this.fecha = ventaEntity.getFecha().toString();
	}
	
	public VentaDto(long idVenta,int estado,String fecha,String telefono,String nombreCliente,double precioTotal){
		this.idVenta = idVenta;
		this.estado = estado;
		this.fecha = fecha;
		this.telefono = telefono;
		this.nombreCliente = nombreCliente;
		this.precioTotal = precioTotal;
	}

	public long getIdVenta() {
		return idVenta;
	}

	public void setIdVenta(long idVenta) {
		this.idVenta = idVenta;
	}

	public int getEstado() {
		return estado;
	}

	public void setEstado(int estado) {
		this.estado = estado;
	}

	public String getFecha() {
		return fecha;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getNombreCliente() {
		return nombreCliente;
	}

	public void setNombreCliente(String nombreCliente) {
		this.nombreCliente = nombreCliente;
	}

	public double getPrecioTotal() {
		return precioTotal;
	}

	public void setPrecioTotal(double precioTotal) {
		this.precioTotal = precioTotal;
	}
	
	
}
