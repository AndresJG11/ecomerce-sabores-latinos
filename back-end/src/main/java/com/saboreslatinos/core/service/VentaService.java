package com.saboreslatinos.core.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.saboreslatinos.core.converter.Converter;
import com.saboreslatinos.core.dto.CategoriaDto;
import com.saboreslatinos.core.dto.ClienteDto;
import com.saboreslatinos.core.dto.VentaDto;
import com.saboreslatinos.core.entity.Categoria;
import com.saboreslatinos.core.entity.Venta;
import com.saboreslatinos.core.repository.VentaRepository;

@Service("venta_servicio")
public class VentaService {

	
	@Autowired
	@Qualifier("converter")
	private Converter convertidor;
	
	@Autowired
	@Qualifier("venta_repository")
	private VentaRepository ventaRepositorio;
	
	@PersistenceContext
	EntityManager entityManager;
	
	
	public boolean agregar(Venta venta) {
		try {
			
			ventaRepositorio.save(venta);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public List<VentaDto> obtener(){
		return convertidor.convertirListaVentas(ventaRepositorio.findAll());
	}
	
	public List<VentaDto> obtenerVentas(int estado){
		
		TypedQuery<VentaDto> query = entityManager.createNamedQuery(Venta.GET_VENTAS, VentaDto.class);
		query.setParameter(1, estado);
		List<VentaDto> ventas = query.getResultList();
		return ventas;
	}
	
	public List<VentaDto> obtenerVentasPaginadas(int pageSize, int actualPage,int estado){
		
		TypedQuery<VentaDto> query = entityManager.createNamedQuery(Venta.GET_VENTAS, VentaDto.class);
		query.setParameter(1, estado);
		query.setFirstResult((actualPage-1)*pageSize);
		query.setMaxResults(pageSize);
		List<VentaDto> ventas = query.getResultList();
		return ventas;
	}
	
	public Optional<Venta> obtenerVentaPorId(long idVenta) {
		
		return ventaRepositorio.findById(idVenta);

	}
	
	public ClienteDto obtenerClientePorIdVenta(long idVenta){
		
		TypedQuery<ClienteDto> query = entityManager.createNamedQuery(Venta.GET_CLIENTE_VENTA, ClienteDto.class);
		query.setParameter(1, idVenta);
		
		List<ClienteDto> cliente = query.getResultList();
		if (cliente.size() > 0) {
			return cliente.get(0);
		}else {
			return null;
		}
		
	}
	
	
	
	
	
	
	
	
	
}
