package com.saboreslatinos.core.repository;

import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.saboreslatinos.core.entity.Venta;

@Repository("venta_repository")
public interface VentaRepository extends JpaRepository<Venta, Serializable>  {

}
