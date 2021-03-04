package com.saboreslatinos.core.controller;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.saboreslatinos.core.dto.AgregarVentaDto;
import com.saboreslatinos.core.dto.ClienteDto;
import com.saboreslatinos.core.dto.DetalleVentaDto;
import com.saboreslatinos.core.entity.Cliente;
import com.saboreslatinos.core.entity.DetalleVenta;
import com.saboreslatinos.core.entity.Producto;
import com.saboreslatinos.core.entity.Venta;
import com.saboreslatinos.core.service.ClienteService;
import com.saboreslatinos.core.service.DetalleVentaService;
import com.saboreslatinos.core.service.ProductoService;
import com.saboreslatinos.core.service.VentaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1")
public class VentaController {
	
	@Autowired
	@Qualifier("venta_servicio")
	private VentaService ventaService;
	
	@Autowired
	@Qualifier("cliente_servicio")
	private ClienteService clienteService;
	
	@Autowired
	@Qualifier("producto_servicio")
	private ProductoService productoService;
	
	@Autowired
	@Qualifier("detalleventa_servicio")
	private DetalleVentaService detalleVentaService;
	
	@PostMapping("/venta") 
	public ResponseEntity<String>  agregarVenta(@RequestBody AgregarVentaDto venta) {
		
		long id = venta.getCliente().getId();
		Optional<Cliente> clienteEntidad = clienteService.obtenerClientePorId(id);
		ClienteDto clienteDto = venta.getCliente();
		
		Venta ventaEntidad = new Venta();
		ventaEntidad.setEstado(0);
		List<DetalleVenta> listaDetallesVentaEntidad = new ArrayList<>();
		
		// Si el cliente no esta creado se crea
		if (clienteEntidad.isPresent()) {
			Cliente clienteActualizado = clienteEntidad.get();
			clienteActualizado.setDireccion(clienteDto.getDireccion());
			clienteActualizado.setDocumento(clienteDto.getDocumento());
			clienteActualizado.setTelefono(clienteDto.getTelefono());
			clienteActualizado.setNombre(clienteDto.getNombre());
			clienteService.agregar(clienteActualizado);
			ventaEntidad.setCliente(clienteActualizado);
			
		}else {
			
			Cliente cliente = new Cliente();
			cliente.setDireccion(clienteDto.getDireccion());
			cliente.setDocumento(clienteDto.getDocumento());
			cliente.setTelefono(clienteDto.getTelefono());
			cliente.setNombre(clienteDto.getNombre());
			clienteService.agregar(cliente);
			ventaEntidad.setCliente(cliente);
		}
		
		
		
		
		 
		List<DetalleVentaDto> listaDetalleVentaDto = venta.getDetallesVenta();
		
		ventaService.agregar(ventaEntidad);
		
		
		for (DetalleVentaDto detalleVentaDto : listaDetalleVentaDto) {
			
			DetalleVenta detalleVentaEntidad = new DetalleVenta();
			detalleVentaEntidad.setCantidad(detalleVentaDto.getCantidad());
			
			Optional<Producto> productoEntidad = productoService.obtenerProductoPorId(detalleVentaDto.getIdProducto());
			
			detalleVentaEntidad.setProducto(productoEntidad.get());
			detalleVentaEntidad.setVenta(ventaEntidad);
			detalleVentaService.agregar(detalleVentaEntidad);
			
		}
		
		return new ResponseEntity<>("Venta agregada con exito", HttpStatus.OK);
	
	}
}
