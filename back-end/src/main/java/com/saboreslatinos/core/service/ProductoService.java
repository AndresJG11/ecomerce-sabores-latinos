package com.saboreslatinos.core.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.saboreslatinos.core.converter.Converter;
import com.saboreslatinos.core.dto.ImagenDto;
import com.saboreslatinos.core.dto.ProductoDto;
import com.saboreslatinos.core.entity.Categoria;
import com.saboreslatinos.core.entity.Imagen;
import com.saboreslatinos.core.entity.Producto;
import com.saboreslatinos.core.repository.ProductoRepository;

@Service("producto_servicio")
public class ProductoService {

	
	@Autowired
	@Qualifier("producto_repository")
	private ProductoRepository productoRepositorio;
	
	@PersistenceContext
	EntityManager entityManager;
	
	@Autowired
	@Qualifier("converter")
	private Converter convertidor;
	
	
	public Producto agregar(Producto producto) {
		try {
		
			return productoRepositorio.save(producto);
			
		} catch (Exception e) {
			return null;
		}
	}
	
	public boolean actualizar(Producto producto) {
		try {
			
			productoRepositorio.save(producto);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public boolean eliminar(long id) {
		try {
			productoRepositorio.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public Optional<Producto> obtenerProductoPorId(long idProducto){
		return productoRepositorio.findById(idProducto);
	}
	
	
	public ProductoDto obtenerProducto(long idCategoria){
		Optional<Producto> producto = productoRepositorio.findById(idCategoria);
		if (producto.isPresent()) {
			return new ProductoDto(producto.get());
		}else {
			return null;
		}
		
	}
	
	public List<ImagenDto> obtenerImagenesProducto(long idProducto) {
		
		TypedQuery<Imagen> query = entityManager.createNamedQuery(Imagen.OBTENER_IMAGENES_POR_PRODUCTO, Imagen.class);
		query.setParameter("id",idProducto );
		List<Imagen> imagenes = query.getResultList();
		return convertidor.convertirListaImagenesDto(imagenes);
	
	}
	
	public List<ProductoDto> obtenerProductoCategoria(long idCategoria) {
		
		List<ProductoDto> productos = new ArrayList<>();
		TypedQuery<ProductoDto> queryProductos= entityManager.createNamedQuery(Categoria.GET_PRODUCTOS_HOME,ProductoDto.class);
		queryProductos.setParameter(1, idCategoria);
		productos = queryProductos.getResultList();
		return productos;
	
	}
	
	public List<ProductoDto> obtenerProductoCategoriaPaginados(long idCategoria,int pageSize, int actualPage) {
		
		List<ProductoDto> productos = new ArrayList<>();
		TypedQuery<ProductoDto> queryProductos= entityManager.createNamedQuery(Categoria.GET_PRODUCTOS_HOME,ProductoDto.class);
		queryProductos.setParameter(1, idCategoria);
		queryProductos.setFirstResult((actualPage-1)*pageSize);
		queryProductos.setMaxResults(pageSize);
		productos = queryProductos.getResultList();
		return productos;
		
	}
	
}
