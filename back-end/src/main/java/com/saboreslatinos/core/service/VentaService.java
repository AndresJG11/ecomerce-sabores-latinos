package com.saboreslatinos.core.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.saboreslatinos.core.entity.Venta;
import com.saboreslatinos.core.repository.VentaRepository;

@Service("venta_servicio")
public class VentaService {

	
	
	@Autowired
	@Qualifier("venta_repository")
	private VentaRepository ventaRepositorio;
	
	
	public boolean agregar(Venta venta) {
		try {
			
			ventaRepositorio.save(venta);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	
	
	
	
}
