package com.saboreslatinos.core.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.saboreslatinos.core.entity.DetalleVenta;
import com.saboreslatinos.core.repository.DetalleVentaRepository;

@Service("detalleventa_servicio")
public class DetalleVentaService {

	@Autowired
	@Qualifier("detalleventa_repository")
	private DetalleVentaRepository detalleVentaRepositorio;
	
	
	public boolean agregar(DetalleVenta detalleVenta) {
		try {
			
			detalleVentaRepositorio.save(detalleVenta);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	
}
