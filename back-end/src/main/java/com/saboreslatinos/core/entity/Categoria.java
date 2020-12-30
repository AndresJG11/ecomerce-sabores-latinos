package com.saboreslatinos.core.entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;
import org.hibernate.annotations.NamedNativeQueries;
import org.hibernate.annotations.NamedNativeQuery;
import com.saboreslatinos.core.dto.CategoriaDto;
import com.saboreslatinos.core.dto.ProductoDto;


@NamedNativeQueries({
	@NamedNativeQuery(name = Categoria.GET_CATEGORIAS_HOME,query = "select * from categoria",resultSetMapping = "GET_CATEGORIAS_HOME_RESULT" ),
	@NamedNativeQuery(name = Categoria.GET_PRODUCTOS_HOME,query = "select * from producto where id_categoria = ?",resultSetMapping = "GET_PRODUCTOS_HOME_RESULT" )
})


@SqlResultSetMapping(
		  name="GET_CATEGORIAS_HOME_RESULT",
		  classes = @ConstructorResult(
				  targetClass = CategoriaDto.class,
				  columns = {
						  @ColumnResult(name = "id_categoria",type = Long.class),
						  @ColumnResult(name = "icono",type = String.class),
						  @ColumnResult(name = "nombre",type = String.class)
						  
				  }
				  )
		)

@SqlResultSetMapping(
		  name="GET_PRODUCTOS_HOME_RESULT",
		  classes = @ConstructorResult(
				  targetClass = ProductoDto.class,
				  columns = {
						  @ColumnResult(name = "id_producto",type = Long.class),
						  @ColumnResult(name = "descripcion",type = String.class),
						  @ColumnResult(name = "descuento",type = Integer.class),
						  @ColumnResult(name = "nombre",type = String.class),
						  @ColumnResult(name = "precio",type = Integer.class),
						  @ColumnResult(name = "stock",type = Integer.class)
						  
				  }
				  )
		)

@Table(name="categoria")
@Entity
public class Categoria implements Serializable {
	
	public static final String GET_CATEGORIAS_HOME = "GET_CATEGORIAS_HOME";
	public static final String GET_PRODUCTOS_HOME = "GET_PRODUCTOS_HOME";
	
	public Categoria() {
		
	}
	
	
	public Categoria(long id, String nombre, String icono, List<Producto> producto) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.icono = icono;
		this.producto = producto;
	}

	@GeneratedValue
	@Id
	@Column(name = "idCategoria")
	private long id;
	
	@Column(name = "nombre")
	private String nombre;
	
	@Column(name = "icono")
	private String icono;
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy = "categoria")
	private List<Producto> producto;

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

	public String getIcono() {
		return icono;
	}

	public void setIcono(String icono) {
		this.icono = icono;
	}

	public List<Producto> getProducto() {
		return producto;
	}

	public void setProducto(List<Producto> producto) {
		this.producto = producto;
	}
	
	
	
	

}
