package com.saboreslatinos.core.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.annotations.NamedNativeQueries;
import org.hibernate.annotations.NamedNativeQuery;
import com.saboreslatinos.core.dto.ClienteDto;
import com.saboreslatinos.core.dto.VentaDto;


@NamedNativeQueries({
	@NamedNativeQuery(name = Venta.GET_VENTAS,query = " select id_venta, fecha,nombre,telefono, "
			+ " (   select sum(cantidad*precio) "
			+ " from detalle_venta dv inner join producto p on dv.producto_id = p.id_producto "
			+ " where dv.id_venta = v.id_venta ) as total,estado "
			+ " from venta v   "
			+ " inner join cliente c  "
			+ " on v.id_cliente = c.id_cliente where estado = ?",resultSetMapping = "GET_VENTAS_RESULT" ),
	@NamedNativeQuery(name = Venta.GET_CLIENTE_VENTA,query = "select c.id_cliente as idCliente, documento,telefono,direccion,nombre "
			+ " from venta v inner join cliente c on v.id_cliente = c.id_cliente "
			+ " where id_venta = ? ",resultSetMapping = "GET_VENTAS_RESULT" )
	
})


@SqlResultSetMapping(name = "GET_VENTAS_RESULT", 
		classes = @ConstructorResult(targetClass = VentaDto.class, columns = 
	{
		@ColumnResult(name = "id_venta", type = Long.class),
		@ColumnResult(name = "estado", type = Integer.class),
		@ColumnResult(name = "fecha", type = String.class),
		@ColumnResult(name = "telefono", type = String.class),
		@ColumnResult(name = "nombre", type = String.class),
		@ColumnResult(name = "total", type = Double.class),
	}))

@SqlResultSetMapping(name = "GET_CLIENTE_VENTA", 
		classes = @ConstructorResult(targetClass = ClienteDto.class, columns = 
{
		@ColumnResult(name = "idCliente", type = Long.class),
		@ColumnResult(name = "documento", type = String.class),
		@ColumnResult(name = "telefono", type = String.class),
		@ColumnResult(name = "direccion", type = String.class),
		@ColumnResult(name = "nombre", type = String.class)

}))




@Table(name="venta")
@Entity
public class Venta implements Serializable {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public static final String GET_VENTAS= "GET_VENTAS";
	public static final String GET_CLIENTE_VENTA= "GET_CLIENTE_VENTA";

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "idVenta")
	private long id;
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy = "venta")
	private List<DetalleVenta> detalleVentas;
	

	@Temporal(TemporalType.TIMESTAMP)
    private Date fecha;
	
	@Column(name = "estado")
	private int estado;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idCliente")
	private Cliente cliente;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public List<DetalleVenta> getDetalleVentas() {
		return detalleVentas;
	}

	public void setDetalleVentas(List<DetalleVenta> detalleVentas) {
		this.detalleVentas = detalleVentas;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public int getEstado() {
		return estado;
	}

	public void setEstado(int estado) {
		this.estado = estado;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	
	
	
	
	
}
