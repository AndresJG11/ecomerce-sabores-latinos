package com.saboreslatinos.core.dto;

import java.util.List;

public class AgregarVentaDto {
	
	private ClienteDto cliente;
	
	private List<DetalleVentaDto> detallesVenta;

	public ClienteDto getCliente() {
		return cliente;
	}

	public void setCliente(ClienteDto cliente) {
		this.cliente = cliente;
	}

	public List<DetalleVentaDto> getDetallesVenta() {
		return detallesVenta;
	}

	public void setDetallesVenta(List<DetalleVentaDto> detallesVenta) {
		this.detallesVenta = detallesVenta;
	}
	
	
	
	
	

}
