package com.cinebook.cinebook.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/movies")
public class PosterController {
    @GetMapping("/poster/{fileName}")
    public ResponseEntity<Resource>getPoster(@PathVariable String fileName) throws IOException{
        Resource resource=new ClassPathResource("static/posters/"+fileName);
        System.out.println("Looking for:"+resource.getDescription());
        System.out.println("Exists:"+resource.exists());
        if(!resource.exists()){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG).body(resource);

    }

}
