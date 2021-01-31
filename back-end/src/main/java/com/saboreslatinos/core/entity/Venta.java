package com.saboreslatinos.core.entity;

import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Table(name="venta")
@Entity
public class Venta {

	
	@GeneratedValue
	@Id
	@Column(name = "idVenta")
	private long id;
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy = "venta")
	private List<DetalleVenta> detalleVentas;
	

	@Temporal(TemporalType.TIMESTAMP)
    private Date fecha;
	
	@Column(name = "estado")
	private int estado;
	
	
}
