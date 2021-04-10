package com.saboreslatinos.core.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.saboreslatinos.core.dto.AnuncioDto;
import com.saboreslatinos.core.entity.Anuncio;
import com.saboreslatinos.core.service.AnuncioService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1")
public class AnuncioController {
	
	@Autowired
	@Qualifier("anuncio_servicio")
	private AnuncioService anuncioService;
	
	
	
	@PostMapping("/anuncio")
	public ResponseEntity<String>  agregarAnuncio(@RequestParam("file") MultipartFile imagen,
			@RequestParam("titulo") String titulo, @RequestParam("enlace") String enlace ) {
		
		Anuncio anuncio = new Anuncio();
		anuncio.setEnlace(enlace);
		anuncio.setTitulo(titulo);
		
	
		if(!imagen.isEmpty()) {
			Path directorioImagenes = Paths.get("src//main//resources//static/images");
			String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();
			
			byte[] bytesImg;
			
			try {
				bytesImg = imagen.getBytes();
				Path rutaCompleta = Paths.get(rutaAbsoluta+"//"+imagen.getOriginalFilename());
				Files.write(rutaCompleta, bytesImg);
				anuncio.setRuta(imagen.getOriginalFilename());
				anuncio.setPicture(bytesImg);
				anuncioService.agregar(anuncio);
				return new ResponseEntity<>("Anuncio creado con exito", HttpStatus.OK);
			} catch (IOException e) {
				e.printStackTrace();
				return new ResponseEntity<>("Ha ocurrido un errro al guardar la imagen", HttpStatus.INTERNAL_SERVER_ERROR);
			}
				
		}else {
			return new ResponseEntity<>("No hay contenido en la imagen", HttpStatus.PARTIAL_CONTENT);
		}
		
	}
	
	@PutMapping("/anuncio/{id}")
	public ResponseEntity<String>  actualizarAnuncio(@RequestParam("enlace") String enlace,
			@RequestParam("titulo") String titulo,
			@PathVariable("id") long  id) {
		
		
		Optional<Anuncio> anuncioEntidad = anuncioService.obtenerAnuncioPorId(id);
		
		if (anuncioEntidad.isPresent()) {
			Anuncio anuncioActualizado = anuncioEntidad.get();
			anuncioActualizado.setEnlace(enlace);
			anuncioActualizado.setTitulo(titulo);
			anuncioService.actualizar(anuncioActualizado);
			return new ResponseEntity<>("Anuncio actualizado con exito", HttpStatus.OK);
		}
		return new ResponseEntity<>("No existe una anunucio con el id: "+id, HttpStatus.NOT_FOUND);
		
	}
	
	@DeleteMapping("/anuncio/{id}")
	public boolean eliminarAnuncio(@PathVariable("id") long  id) {
		return anuncioService.eliminar(id);
	}
	
	@PutMapping("/anuncio/imagen/{id}")
	public ResponseEntity<String>  actualizarImagenAnuncio(@RequestParam("file") MultipartFile imagen,@PathVariable("id") long  id) {
		
	
		Optional<Anuncio> anuncioEntidad = anuncioService.obtenerAnuncioPorId(id);
		if (anuncioEntidad.isPresent()) {
			
			Anuncio anuncioActualizado = anuncioEntidad.get();
			
			if(!imagen.isEmpty()) {
				
				File imagenAntigua = new File("src//main//resources//static/images//"+anuncioActualizado.getRuta());
				if(imagenAntigua.exists()) {
					imagenAntigua.delete();
				}
				
				Path directorioImagenes = Paths.get("src//main//resources//static/images");
				String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();
				
				byte[] bytesImg;
				
				try {
					bytesImg = imagen.getBytes();
					Path rutaCompleta = Paths.get(rutaAbsoluta+"//"+imagen.getOriginalFilename());
					Files.write(rutaCompleta, bytesImg);
					anuncioActualizado.setRuta(imagen.getOriginalFilename());
					anuncioService.actualizar(anuncioActualizado);
					return new ResponseEntity<>("Imagen actualizada con exito", HttpStatus.OK);
				} catch (IOException e) {
					e.printStackTrace();
					return new ResponseEntity<>("Ha ocurrido un errro al guardar la imagen", HttpStatus.INTERNAL_SERVER_ERROR);
				}
					
			}else {
				return new ResponseEntity<>("No hay contenido en la imagen", HttpStatus.PARTIAL_CONTENT);
			}
		
		}
		return new ResponseEntity<>("No existe un anuncio con el id"+id, HttpStatus.NOT_FOUND);
		
	}
	
	
	@GetMapping("/anuncio")
	public ResponseEntity<List<AnuncioDto>> obtenerAnuncios(@RequestParam("pageSize") String pageSize,
			@RequestParam("actualPage") String actualPage) {
		
		
		return  new ResponseEntity<List<AnuncioDto>>(anuncioService.obtener(), HttpStatus.OK);
	}

}
