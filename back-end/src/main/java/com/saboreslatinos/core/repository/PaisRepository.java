package com.saboreslatinos.core.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.saboreslatinos.core.entity.Pais;

@Repository("pais_repository")
public interface PaisRepository extends JpaRepository<Pais, Serializable> {

}
