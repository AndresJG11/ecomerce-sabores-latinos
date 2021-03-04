package com.saboreslatinos.core.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.saboreslatinos.core.entity.DetalleVenta;

@Repository("detalleventa_repository")
public interface DetalleVentaRepository extends JpaRepository<DetalleVenta, Serializable> {

}
