package com.saboreslatinos.core.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.saboreslatinos.core.entity.Imagen;

@Repository("imagen_repository")
public interface ImagenRepository extends JpaRepository<Imagen, Serializable> {

}
